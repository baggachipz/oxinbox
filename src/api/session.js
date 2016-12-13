import http from './http';
import Vue from 'vue';
export default {
    login (credentials) {
        
        
        return http.post('login?action=login', {name: credentials.username, password: credentials.password})
        .then(json => {
            if (json.error) {
                throw(Vue.t('login.error'))
            } 
            return json;
        });
    },
    logout () {
        
    }
};