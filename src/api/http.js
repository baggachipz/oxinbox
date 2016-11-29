import 'whatwg-fetch';

const http = {
    get: function(endpoint, params) {
        
        return fetch('/ajax/' + endpoint + (params ? '?' + prepareParams(params) : ''), {
            credentials: 'include'
        })
        .then(response => response.json());
        
    },
    post: function(endpoint, data) {
        
        return fetch('/ajax/' + endpoint, {
            method: 'POST',
            body: prepareParams(data),
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' 
            },
            credentials: 'include'
        }).then(response => response.json());

    }
};

function prepareParams(params) {

    let output = '';

    if (params !== null && typeof params !== 'undefined' && typeof params === 'object') {
        
        for (let key in params) {
            
            output += (output === '' ? '' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }
    }

    return output;

}

export default http;