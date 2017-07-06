import http from './http';
import Exception from '../util/Exception';
import Vue from 'vue';

class SessionApiException extends Exception {}

export default {

    /**
     * Attempt to log the user in
     * @param {string} username 
     * @param {string} password 
     * @param {boolean} rememberme 
     */
    login (username, password, rememberme) {

        username = typeof(username) === 'string' ? username : '';
        password = typeof(password) === 'string' ? password : '';
        rememberme = typeof(rememberme) !== 'boolean' ? false : rememberme;

        // perform an old-style post since a newer FormData-based post seems to bomb out on the server
        return http.classicPost('login?action=login', {name: username, password: password})
        .then(json => {
            if (json.error) {
                throw new SessionApiException(Vue.t('login.error'));
            }
            if (rememberme) {
                // if the user selected 'remember me', store the session
                http.classicPost('login?action=store', {session: json.session});
            } 
            return json;
        });
    },

    /**
     * If user has selected 'remember me', log them in automatically
     */
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
    /**
     * Log the user out
     * @param {string} session 
     */
    logout (session) {
        
        // invalid session? Don't post, just return
        if (typeof(session) === 'string') http.post('login?action=logout', {session: session});
        
        return new Promise(function(resolve) {
            resolve(true);
        });
        
    },
    /**
     * Get the currently logged-in user's data
     * @param {string} session 
     */
    getCurrentUser (session) {
        return http.get('user', {action: 'get', session: session});
    }
};