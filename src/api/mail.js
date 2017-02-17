import http from './http';
import Exception from '../util/exception';

class MailApiException extends Exception {}

export default {

    getMails: function(session, folder, start, length, sort, order) {

        // input validation
        if (!session) throw new MailApiException('A valid session is required to make a server call.');
        folder = typeof(folder) === 'string' ? folder : 'default0/INBOX';
        start = Number.isInteger(start) ? start : 0;
        length = Number.isInteger(length) ? length : 20;
        sort = sort ? sort : '610';
        order = ['asc','desc'].indexOf(order) > -1 ? order : 'desc';

        // perform fetch
        return http.get('mail', {folder: folder, action: 'all', session: session, columns: '102,600,601,602,603,604,605,606,607,608,609,610,', sort: sort, order: order, limit: `${start},${length}`})
        .then(json => {
            if (json.error) {
                throw('Folder Error: There was an error getting the mail list.')
            } 
            return json;
        });
        
    },

    getMail: function(session, id, folder) {

        // input validation
        if (!session) throw new MailApiException('A valid session is required to make a server call.');
        if (!id) throw new MailApiException('Unknown mail id provided.');
        if (!folder) throw new MailApiException('Unknown mail folder provided.');

        // perform fetch
        return http.get('mail', {action: 'get', session: session, id: id, folder: folder, view: 'html'})
        .then(json => {
            if (json.error) {
                throw('Mail Error: There was an error fetching the mail.');
            }
            return json;
        })

    }

}