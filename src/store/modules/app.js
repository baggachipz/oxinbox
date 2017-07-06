import * as types from '../mutation-types';

const APP_TYPES = {
    INBOX: 'inbox',
    CALENDAR: 'calendar',
    CONTACTS: 'contacts'
};

const state = {
    currentApp: APP_TYPES.INBOX
};

const mutations = {
    
    [types.APP_SET_CURRENT] (state, val) {
        if (APP_TYPES[val]) {
            state.currentApp = val;
        } else {
            throw val + ' is not a valid application;';
        }
    },

};

const getters = {
    currentApp: state => state.currentApp
};

const actions = {

    setCurretApp: ({commit}, {app}) => {
        commit(types.APP_SET_CURRENT, app);
    },

    refreshView: ({dispatch, state}) => { 
        switch(state.currentApp) {
            case APP_TYPES.INBOX:
                dispatch('getMails');
                break;
        }
    }

};

export default {
    state,
    mutations,
    getters,
    actions
}