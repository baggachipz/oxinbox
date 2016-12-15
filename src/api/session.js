import http from './http';
import Vue from 'vue';
export default {
    login (credentials) {
        return http.post('login?action=login', {name: credentials.username, password: credentials.password})
        .then(json => {
            if (json.error) {
                throw(Vue.t('login.error'));
            }
            if (credentials.rememberme) {
                http.post('login?action=store', {session: json.session});
            } 
            return json;
        });
    },
    autologin () {
        return http.get('login?action=autologin')
        .then(json => {
            if (json.error) {
                throw(Vue.t('login.error'));
            } else {
                return json;
            }
        });
    },
    logout (session) {
        http.post('login?action=logout', {session: session});
        return new Promise(function(resolve) {
            resolve(true);
        });
        
    }
};