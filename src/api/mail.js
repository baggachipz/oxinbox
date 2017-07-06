import Vue from 'vue';
import http from './http';
import Exception from '../util/Exception';

class MailApiException extends Exception {
    constructor(msg) {
        super(msg, Exception.ERROR_TYPE_API);
    }
}

export default {

    /**
     * Get list of mails based on parameters, with defaults
     */
    getMails: (session, folder, start, length, sort, order) => {

        // input validation
        if (!session) throw new MailApiException(Vue.t('common.invald_session'));
        folder = typeof(folder) === 'string' ? folder : 'default0/INBOX';
        start = Number.isInteger(start) ? start : 0;
        length = Number.isInteger(length) ? length : 20;
        sort = sort ? sort : '610';
        order = ['asc','desc'].indexOf(order) > -1 ? order : 'desc';

        // perform fetch
        return http.get('mail', {folder: folder, action: 'all', session: session, columns: '102,600,601,602,603,604,605,606,607,608,609,610,611', sort: sort, order: order, limit: `${start},${length}`})
        .then(json => {
            if (json.error) {
                throw new MailApiException(Vue.t('mail.folder_error'))
            } 
            return json;
        });
        
    },

    /**
     * Get a specific mail by id/folder combo (the canonical definition of a mail object)
     */
    getMail: (session, id, folder) => {

        // input validation
        if (!session) throw new MailApiException(Vue.t('common.invalid_session'));
        if (!id) throw new MailApiException(Vue.t('mail.unknown_id'));
        if (!folder) throw new MailApiException(Vue.t('mail.unknown_folder'));

        // perform fetch
        return http.get('mail', {action: 'get', session: session, id: id, folder: folder, view: 'html'})
        .then(json => {
            if (json.error) {
                throw new MailApiException(Vue.t('mail.error_fetch'));
            }
            return json;
        })

    },

    /**
     * Send an email.
     */
    sendMail: (session, mail) => {
        
        let payload = {};

        // create first part of payload from data passed in
        for (let key of ['from','subject','priority','vcard','sendtype']) {
            payload[key] = mail[key];
        }

        // create an array of items for each of these fields
        for (let field of ['to', 'cc', 'bcc']) {
            payload[field] = [];
            
            for (let item of mail[field]) {
                payload[field].push([item.label, item.value]);
            }
        }

        // put the mail body as an attachment, as AppSuite wants
        payload.attachments = [{
            content: mail.body,
            content_type: 'ALTERNATIVE',
            disp: 'inline',
            filename: '',
            uploaded: 1,
            meta: {}
        }];

        return http.post('mail?action=new&session=' + session, {json_0: payload})
            .then(json => {
                if (json.error) {
                    throw new MailApiException(Vue.t('mail.error_send'));
                }
                return json;
            })

    },

    /**
     * Set a flag value for a given mail (defined by folder/id combo)
     */
    setFlag: (session, id, folder, flag, value) => {
        http.put('mail', {
            action: 'update',
            session: session,
            id: id,
            folder: folder,
            data: {flags: flag, value: value}
        });
    }

}