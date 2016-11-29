import http from './http';

export default {

    loadMails: function(session) {

        return http.get('mail', {folder: 'default0/INBOX', action: 'all', session: session, columns: '102,600,601,602,603,604,605,606,607,608,609,610,', sort: '610', order: 'desc', limit: '0,50'})
        .then(json => {
            if (json.error) {
                throw('Folder Error: There was an error getting the mail list.')
            } 
            return json;
        });
        
    },

    loadMail: function(session, id, folder) {

        return http.get('mail', {action: 'get', session: session, id: id, folder: folder, view: 'html'})
        .then(json => {
            if (json.error) {
                throw('Mail Error: There was an error fetching the mail.');
            }
            return json;
        })

    }

}