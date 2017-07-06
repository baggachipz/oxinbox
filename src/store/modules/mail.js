import * as types from '../mutation-types';
import mailApi from '../../api/mail';
import folderApi from '../../api/folders';
import Exception from '../../util/Exception';

class MailStoreException extends Exception {}

const state = {
    mails: [],
    mail_display_folder: 'default0/INBOX',
    mail_display_start: 0,
    mail_display_length: 20,
    mail_display_sort: 610,
    mail_display_sort_order: 'desc',
    mail_fetch_loading: false,
    mail_fetch_error: false,
    mails_list_loading: false,
    mails_list_error: false,
    folders: {},
    folders_list_loading: false,
    compose_windows: []
};

const mutations = {

    [types.MAIL_LIST_REQUEST] (state) {
        state.mails_list_loading = true;
        state.mails_list_error = false;
    },

    [types.MAIL_LIST_SUCCESS] (state, data) {
        state.mails = data.mails;
        state.mail_display_folder = data.folder
        state.mails_list_loading = false;
    },

    [types.MAIL_LIST_ERROR] (state, error) {
        state.mails_list_error = error;
        state.mails_list_loading = false;
    },

    [types.MAIL_FETCH_REQUEST] (state) {
        state.mail_fetch_loading = true;
        state.mail_fetch_error = false;
    },

    [types.MAIL_FETCH_SUCCESS] (state, data) {
        state.mails[data.index].body = data.body;
        state.mails[data.index].showBody = true;
        state.mail_fetch_loading = false;
    },

    [types.MAIL_FETCH_ERROR] (state, error) {
        state.mail_fetch_error = error;
        state.mail_fetch_loading = false;
    },
 
    [types.MAIL_SET_DISPLAY_FOLDER] (state, folder) {
        state.mail_display_folder = folder;
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

    [types.MAIL_HIDE] (state, index) {
        state.mails[index].showBody = false;
    },

    [types.MAIL_HIDE_ALL] (state) {
        for (let key in state.mails) {
            state.mails[key].showBody = false;
        }
    },

    [types.MAIL_COMPOSE_EDIT] (state, data) {

        const mail = {
            from: '',
            to: [],
            cc: [],
            bcc: [],
            subject: '',
            body: '',
            attachments: [],
            type: 'text/html',
            msgref: '',
            priority: '3',
            vcard: 0,
            sendtype: 0,
            disp_notification_to: true
        };

        state.compose_windows.push(Object.assign(mail, data));
    },

    [types.MAIL_COMPOSE_EDIT_UPDATE_SUBJECT] (state, data) {
        if (!data.index) data.index = 0;
        state.compose_windows[data.index].subject = data.subject;
    },

    [types.MAIL_COMPOSE_EDIT_UPDATE_BODY] (state, data) {
        state.compose_windows[data.index].body = data.body
    },

    [types.MAIL_COMPOSE_EDIT_UPDATE_TO] (state, data) {
        if(!data.addresses) data.addresses = [];
        state.compose_windows[data.index].to = [];
        for (let address of data.addresses) {
            state.compose_windows[data.index].to.push(address);
        }
    },

    [types.MAIL_COMPOSE_EDIT_UPDATE_CC] (state, data) {
        if(!data.addresses) data.addresses = [];
        state.compose_windows[data.index].cc = [];
        for (let address of data.addresses) {
            state.compose_windows[data.index].cc.push(address);
        }
    },

    [types.MAIL_COMPOSE_EDIT_UPDATE_BCC] (state, data) {
        if(!data.addresses) data.addresses = [];
        state.compose_windows[data.index].bcc = [];
        for (let address of data.addresses) {
            state.compose_windows[data.index].bcc.push(address);
        }
    },

    [types.MAIL_COMPOSE_CLOSE] (state, index) {
        state.compose_windows.splice(index, 1);
    },

    [types.MAIL_MARK_READ] (state, index) {
        state.mails[index].flags.seen = true;
    }

};

const getters = {
    mails: state => state.mails,
    display_folder: state => state.mail_display_folder,
    display_start: state => state.mail_display_start,
    display_length: state => state.mail_display_length,
    display_sort: state => state.mail_display_sort,
    display_sort_order: state => state.mail_display_sort_order
};

const actions = {
    getMails: ({commit, rootState}) => {

        commit(types.MAIL_LIST_REQUEST);

        return mailApi.getMails(rootState.session.session, rootState.mail.display_folder, rootState.mail.display_start, rootState.mail.display_length, rootState.mail.display_sort, rootState.mail.display_sort_order).then(function (mails) {

            let returnMails = [];

            for (let key in mails.data) {
                let mail = mails.data[key];
                let flags = mail[12];

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
                    flags: {
                        answered: (flags & 1) === 1,
                        deleted: (flags & 2) === 2,
                        draft: (flags & 4) === 4,
                        flagged: (flags & 8) === 8,
                        recent: (flags & 16) === 16,
                        seen: (flags & 32) === 32,
                        user: (flags & 64) === 64,
                        spam: (flags & 128) === 128,
                        forwarded: (flags & 256) === 256    
                    },
                    showBody: false
                });
            }

            commit(types.MAIL_LIST_SUCCESS, {folder: rootState.mail.display_folder, mails: returnMails, start: rootState.mail.display_start, length: rootState.mail.display_length, sort: rootState.mail.display_sort, order: rootState.mail.display_sort_order});
        }).catch(function(e) {
            const error = e instanceof Exception ? e.msg : e;
            commit(types.MAIL_LIST_ERROR, error);
        });

    },

    getMail: ({commit, rootState}, {id, index, folder}) => {

        commit(types.MAIL_FETCH_REQUEST);

        if (index && rootState.mail.mails[index].body && rootState.mail.mails[index].body.length) {

            commit(types.MAIL_FETCH_SUCCESS, {index: index, body: rootState.mail.mails[index].body});

        } else {

            return mailApi.getMail(rootState.session.session, id, folder).then(function(data) {
                debugger;
                if (data.data) {
                    commit(types.MAIL_FETCH_SUCCESS, {index: index, body: data.data.attachments[0].content});
                }

            }).catch(function(e) {
                const error = e instanceof Exception ? e.msg : e;
                commit(types.MAIL_FETCH_ERROR, error);
            });
        }

    },

    setMailDisplayFolder: ({commit, rootState}, folder) => {
        commit(types.MAIL_SET_DISPLAY_FOLDER, folder);
        return actions.getMails({commit, rootState}, folder);
    },

    hideMail: ({commit}, index) => {
        commit(types.MAIL_HIDE, index);
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
    },
    mailNewComposeWindow: ({commit}, data) => {
        commit(types.MAIL_COMPOSE_EDIT, Object.assign(data));
    },
    mailComposeUpdateSubject: ({commit}, data) => {
        commit(types.MAIL_COMPOSE_EDIT_UPDATE_SUBJECT, data);
    },
    mailComposeUpdateBody: ({commit}, data) => {
       commit(types.MAIL_COMPOSE_EDIT_UPDATE_BODY, data);
    },
    mailComposeUpdateToAddresses: ({commit}, data) => {
        commit(types.MAIL_COMPOSE_EDIT_UPDATE_TO, data);
    },
    mailComposeUpdateCcAddresses: ({commit}, data) => {
        commit(types.MAIL_COMPOSE_EDIT_UPDATE_CC, data);
    },
    mailComposeUpdateBccAddresses: ({commit}, data) => {
        commit(types.MAIL_COMPOSE_EDIT_UPDATE_BCC, data);
    },
    mailComposeClose: ({commit}, index) => {
        commit(types.MAIL_COMPOSE_CLOSE, index);
    },
    mailComposeSend: ({commit, rootState}, data) => {
        return mailApi.sendMail(rootState.session.session, data.mail)
        .then(() => {
            commit(types.MAIL_COMPOSE_CLOSE, data.index);
        });
    },
    mailMarkAsRead: ({commit, rootState}, data) => {
        return mailApi.setFlag(rootState.session.session, data.id, data.folder, 32, true)
        .then(() => {
            commit(types.MAIL_MARK_READ, data);
        });
    } 

}

/**
 * Recursively find a folder by its id. 
 * 
 * Use the fact that folders are named in a tree fashion to speed the search down the tree.
 * @param folders The starting folder array to search in
 * @param id The string id of the folder to find
 * @param depth Optional, 1-based (to use in array.slice) and defaults fo 1.
 */
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
            return findFolderById(parent.sub_folders, id, ++depth);
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