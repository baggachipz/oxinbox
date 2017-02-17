import http from './http';
import Exception from '../util/exception';
import Vue from 'vue';

class SessionApiException extends Exception {}

export default {
    login (username, password, rememberme) {

        username = typeof(username) === 'string' ? username : '';
        password = typeof(password) === 'string' ? password : '';
        rememberme = typeof(rememberme) !== 'boolean' ? false : rememberme;

        return http.post('login?action=login', {name: username, password: password})
        .then(json => {
            if (json.error) {
                throw new SessionApiException(Vue.t('login.error'));
            }
            if (rememberme) {
                http.post('login?action=store', {session: json.session});
            } 
            return json;
        });
    },
    autologin () {
        return http.get('login?action=autologin')
        .then(json => {
            if (json.error) {
                throw new SessionApiException(Vue.t('login.error'));
            } else {
                return json;
            }
        });
    },
    logout (session) {
        
        // invalid session? Don't post, just return
        if (typeof(session) === 'string') http.post('login?action=logout', {session: session});
        
        return new Promise(function(resolve) {
            resolve(true);
        });
        
    }
};