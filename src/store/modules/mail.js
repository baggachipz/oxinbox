import * as types from '../mutation-types';
import mailApi from '../../api/mail';
import folderApi from '../../api/folders';
import Exception from '../../util/exception';

class MailStoreException extends Exception {}

const state = {
    mails: [],
    mail_fetch_loading: false,
    mails_list_loading: false,
    folders: [],
    folders_list_loading: false,
    folders_all_list_loading: false
};

const mutations = {

    [types.MAIL_LIST_REQUEST] (state) {
        state.mails_list_loading = true;
    },

    [types.MAIL_LIST_SUCCESS] (state, mails) {
        state.mails = mails;
        state.mails_list_loading = false;
    },

    [types.MAIL_FETCH_REQUEST] (state) {
        state.mail_fetch_loading = true;
    },

    [types.MAIL_FETCH_SUCCESS] (state, data) {
        state.mails[data.index].body = data.body;
        state.mails[data.index].showBody = true;
        state.mail_fetch_loading = false;
    },

    [types.MAIL_FOLDERS_FETCH_REQUEST] (state) {
        state.folders_list_loading = true;
    },

    [types.MAIL_FOLDERS_FETCH_SUCCESS] (state, payload) {
        state.folders_list_loading = false;
        if (payload.id === 1) {
            state.folders = payload.folders;
        } else {
            findFolderById(state.folders, payload.id).sub_folders = payload.folders;
        }
    },

    [types.MAIL_HIDE_ALL] (state) {
        for (let key in state.mails) {
            state.mails[key].showBody = false;
        }
    }
};

const getters = {
    mails: state => state.mails
};

const actions = {
    getMails: ({commit, rootState}) => {

        commit(types.MAIL_LIST_REQUEST);

        return mailApi.getMails(rootState.session.session).then(function (mails) {

            let returnMails = [];

            for (let key in mails.data) {
                let mail = mails.data[key];

                returnMails.push({
                    id: mail[1],
                    folder: mail[2],
                    from: mail[4],
                    to: mail[5],
                    cc: mail[6],
                    bcc: mail[7],
                    subject: mail[8],
                    size: mail[9],
                    received: mail[11],
                    showBody: false
                });
            }

            commit(types.MAIL_LIST_SUCCESS, returnMails);
        });

    },

    getMail: ({commit, rootState}, {id, folder}) => {

        commit(types.MAIL_FETCH_REQUEST);
        
        return mailApi.getMail(rootState.session.session, id, folder).then(function(data) {

            commit(types.MAIL_HIDE_ALL);

            let mailIndex = -1;

            for (let key in rootState.mails) {
                if (rootState.mails[key].id === data.data.id) {
                    mailIndex = key;
                    break;
                }
            }

            if (mailIndex >= 0) {
                commit(types.MAIL_FETCH_SUCCESS, {index: mailIndex, body: data.data.attachments[0].content});
            }

        });
    },

    hideAllMail: ({commit}) => {
        commit(types.MAIL_HIDE_ALL);
    },

    getDefaultMailFolders: ({commit, rootState}) => {
        
        return actions.getMailFolders({commit, rootState}, 1)
            .then(function(folders) {
                return actions.getMailFolders({commit, rootState}, folders[0].id);
            })
            .then(function(folders) {
                return actions.getMailFolders({commit, rootState}, folders[0].id);
            })

    }, 

    getMailFolders: ({commit, rootState}, folderId) => {

        commit(types.MAIL_FOLDERS_FETCH_REQUEST);

        if (!folderId) throw new MailStoreException('folderId is required to fetch a folder');

        return folderApi.getFolders(rootState.session.session, 'mail', folderId)
            .then(function(folders) {

                let returnFolders = [];

                for(let folder of folders.data) {
                    returnFolders.push({
                        id: folder[0],
                        creation_date: folder[3],
                        last_modified: folder[4],
                        parent_id: folder[6],
                        title: folder[7],
                        type: folder[9],
                        has_subfolders: folder[10],
                        count_total: folder[15],
                        count_new: folder[16],
                        count_unread: folder[17],
                        count_deleted: folder[18],
                        capabilities: folder[19],
                        subscribed: folder[20],
                        subscribed_subfolders: folder[21],
                        standard_folder_type: folder[22],
                        sub_folders: folder[10] ? [] : null
                    });
                }

                commit(types.MAIL_FOLDERS_FETCH_SUCCESS, {id: folderId, folders: returnFolders});

                return returnFolders;

            });
    }
}

function findFolderById(folders, id, depth) {
    if (!depth) depth = 1;
    let idArray = id.split('/');
    let folder = folders.find(function(item) {return item.id === id});

    if (folder) {
        return folder;
    } else {
        let parentId = idArray.slice(0, depth).join('/');
        let parent = folders.find(function(item) {return item.id === parentId});
        if (parent) {
            return findFolderById(parent.sub_folders, id, depth++);
        } else {
            throw `parent with id ${parentId} not found; id: ${id}, depth: ${depth}`;
        }
    }

}

export default {
    state,
    mutations,
    getters,
    actions
}