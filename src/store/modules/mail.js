import * as types from '../mutation-types';
import mailApi from '../../api/mail';

const state = {
    mails: []
};

const mutations = {
    [types.MAIL_LIST_SUCCESS] (state, data) {
        
        for (let key in data.data) {
            let mail = data.data[key];

            state.mails.push({
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

        
    },

    [types.MAIL_FETCH_SUCCESS] (state, data) {

        let mailIndex = -1;

        for (let key in state.mails) {
            state.mails[key].showBody = false;
            if (state.mails[key].id === data.data.id) {
                mailIndex = key;
            }

        }

        if (mailIndex >= 0) {
            state.mails[mailIndex].body = data.data.attachments[0].content;
            state.mails[mailIndex].showBody = true;
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

        // commit(types.MAIL_FOLDERS_REQUEST);


        return mailApi.loadMails(rootState.session.session).then(function (data) {
            commit(types.MAIL_LIST_SUCCESS, data);
        });

    },

    getMail: ({commit, rootState}, {id, folder}) => {
        
        return mailApi.loadMail(rootState.session.session, id, folder).then(function(data) {
            commit(types.MAIL_FETCH_SUCCESS, data);
        });
    },

    hideAllMail: ({commit}) => {
        commit(types.MAIL_HIDE_ALL);
    }   
}

export default {
    state,
    mutations,
    getters,
    actions
}