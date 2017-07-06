import * as types from '../mutation-types';
import sessionApi from '../../api/session';

const state = {
    user: {
        name: null,
        id: null,
        display_name: null,
        context_id: null,
        email1: null,
        email2: null,
        email3: null
    },
    session: null,
    locale: null,
    timezone: null,
    loggingIn: false,
    loggedIn: false,
    form_username: '',
    form_password: '',
    form_rememberme: false,
    form_error: ''
};

const mutations = {
    
    [types.SESSION_LOGIN_FORM_SET_USERNAME] (state, val) {
        state.form_username = val;
    },

    [types.SESSION_LOGIN_FORM_SET_PASSWORD] (state, val) {
        state.form_password = val;
    },

    [types.SESSION_LOGIN_FORM_SET_REMEMBERME] (state, val) {
        state.form_rememberme = !!val;
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
            state.user.name = data.user;
            state.user.id = data.user_id;
            state.user.context_id = data.context_id;
            state.session = data.session
            state.locale = data.locale;
            state.loggingIn = false;
        }
    },

    [types.SESSION_LOGIN_FAILURE] (state, err) {
        if (state.loggingIn) {
            state.loggingIn = false;
        }
        state.form_error = err.msg;
    },

    [types.SESSION_LOGIN_RESET_ERROR] (state) {
        state.form_error = '';
    },

    [types.SESSION_LOGOUT] (state) {
        // re-init session data
        state.user = {};
        state.session = null;
        state.locale = null;
        state.context_id = null;
    },

    [types.SESSION_USER_INFO] (state, data) {
        state.user.display_name = data.display_name;
        state.user.email1 = data.email1;
        state.user.email2 = data.email2;
        state.user.email3 = data.email3;
        state.timezone = data.timezone;
    }
}

const actions = {
    login: ({commit, dispatch}, payload) => {
    
        // mark that request is being made
        commit(types.SESSION_LOGIN_REQUEST);

        return sessionApi.login(payload.username, payload.password, payload.rememberme).then(function (data) {
            commit(types.SESSION_LOGIN_SUCCESS, data);
            commit(types.SESSION_LOGIN_RESET_FORM);
        }).then(function() {
            dispatch('getCurrentUser');    
        }).catch(function (err) {
            commit(types.SESSION_LOGIN_FAILURE, err);
            throw err;
        });
    },
    autologin: ({commit, dispatch}) => {

        return sessionApi.autologin().then(function(data) {
            commit(types.SESSION_LOGIN_REQUEST);
            commit(types.SESSION_LOGIN_SUCCESS, data);
        }).then(function () {
            dispatch('getCurrentUser');
        });

    },
    getCurrentUser: ({commit, state}) => {
        // load additional user information
        return sessionApi.getCurrentUser(state.session).then(function (data) {
            commit(types.SESSION_USER_INFO, data.data);
        });
    },
    logout: ({commit, state}) => {

        return sessionApi.logout(state.session).then(function() {
            commit(types.SESSION_LOGOUT);
        });

    }

}

const getters = {
    loggedIn: state => (state.session && state.user && state.user.id),
    form_username: state => state.form_username,
    form_password: state => state.form_password,
    form_rememberme: state => state.form_rememberme,
    form_error: state => state.form_error,
    user: state => state.user
}

export default {
  state,
  mutations,
  getters,
  actions
}