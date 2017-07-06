import Vue from 'vue';
import http from './http';
import Exception from '../util/Exception';

class ContactsApiException extends Exception {}

export default {

    /**
     * Autocomplete api call to search for contacts
     */
    autocomplete: function(session, query) {

        // require session id
        if (!session) throw new ContactsApiException(Vue.t('common.invalid_session'));

        // default query if none passed
        if (!query) query = '';
        
        // do fetch and pass the columns requested
        return http.get('contacts', {action: 'autocomplete', session: session, query: query, columns:'500,555,556,557', sort: '500', order: 'asc'})
        .then(json => {
            if (json.error || !json.data) {
                throw new ContactsApiException(Vue.t('contacts.error_fetch'));
            }

            let values = [];

            // add the literal query as an option to the beginning of the list (in case user wants to put in a value that is not a contact)
            values.push({value: query, label: `"${query}"`});

            // iterate through the response data
            json.data.map(function(contact) {
                
                // add one item to the return array for each email address
                for (let key of [1,2,3]) {
                    if (contact[key] && contact[key] != '') values.push({value: contact[key], label: contact[0]});
                }
            });

            return values;
        })

    }

}
