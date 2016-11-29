import * as types from '../mutation-types';
import sessionApi from '../../api/session';

const state = {
    user: null,
    user_id: null,
    session: null,
    locale: null,
    context_id: null,
    loggingIn: false,
    form_username: '',
    form_password: ''
};

const mutations = {
    
    [types.SESSION_LOGIN_FORM_SET_USERNAME] (state, val) {
        state.form_username = val;
    },

    [types.SESSION_LOGIN_FORM_SET_PASSWORD] (state, val) {
        state.form_password = val;
    },

    [types.SESSION_LOGIN_RESET_FORM] (state) {
        state.form_username = '';
        state.form_password = '';
    },

    [types.SESSION_LOGIN_REQUEST] (state) {
        state.loggingIn = true;
    },

    [types.SESSION_LOGIN_SUCCESS] (state, data) {
        if (state.loggingIn) {
            state.user = data.user;
            state.user_id = data.user_id;
            state.session = data.session
            state.locale = data.locale;
            state.context_id = data.context_id;
            state.loggingIn = false;
        }
    },

    [types.SESSION_LOGIN_FAILURE] () {
        if (state.loggingIn) {
            state.loggingIn = false;
        }
    },

    [types.SESSION_LOGOUT] (state) {
        // re-init session data
        state.user = null;
        state.user_id = null;
        state.session = null;
        state.locale = null;
        state.context_id = null;
    }
}

const actions = {
    login: ({commit}, credentials) => {
    
        // mark that request is being made
        commit(types.SESSION_LOGIN_REQUEST);

        return sessionApi.login(credentials).then(function (data) {
            commit(types.SESSION_LOGIN_SUCCESS, data);
            commit(types.SESSION_LOGIN_RESET_FORM);
        }).catch(function (err) {
            commit(types.SESSION_LOGIN_FAILURE, err);
            throw err;
        });
    }

}

const getters = {
    loggedIn: state => {
        return state.user_id !== null;
    },
    form_username: state => state.form_username,
    form_password: state => state.form_password
}

export default {
  state,
  mutations,
  getters,
  actions
}