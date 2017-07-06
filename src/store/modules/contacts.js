import * as types from '../mutation-types';
import contactsApi from '../../api/contacts';

const state = {
    autocompleteData: []
}

const mutations = {
    
    [types.CONTACTS_SET_AUTOCOMPLETE] (state, val) {
        state.autocompleteData = val;
    },

}

const actions = {

    contactsAutoComplete: ({commit, rootState}, search) => {
        return contactsApi.autocomplete(rootState.session.session, search).then(data => {
            commit(types.CONTACTS_SET_AUTOCOMPLETE, data);
        });
    }

}

const getters = {
    autocompleteData: state => state.autocompleteData
}

export default {
  state,
  mutations,
  getters,
  actions
}



