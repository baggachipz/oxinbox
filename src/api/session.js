import http from './http';

export default {
    login (credentials) {
        return http.post('login?action=login', {name: credentials.username, password: credentials.password})
        .then(json => {
            if (json.error) {
                throw('Login error: Please enter a correct user name and password.')
            } 
            return json;
        });
    },
    logout () {
        
    }
};