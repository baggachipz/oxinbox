import 'whatwg-fetch';

const http = {
    get(endpoint, data) {

        let params = '';

        // construct parameters to pass based on data passed in. Could be string or object
        if (data !== null && typeof data !== 'undefined' && typeof data === 'object') {
            for (let key in data) {
                if (data[key] !== null && typeof data[key] === 'object') {
                    data[key] = JSON.stringify(data[key]);
                } else {
                    params += (params === '' ? '' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
                }
            }
        } else {
            params = data;
        }

        // perform fetch and get the response json to pass along
        return fetch('/ajax/' + endpoint + (params && params.length ? '?' + params : ''), {
            credentials: 'include'
        })
        .then(response => response.json());
        
    },
    post(endpoint, data) {

        // create FormData object to pass in post        
        let body = new FormData();

        // allow passing in of FormData object, but if it's not construct it
        if (!(data instanceof FormData)) {

            // iterate over object and append FormData items, compressing objects into json for passing
            for (let key in data) {
                if (data[key] !== null && typeof data[key] === 'object') {
                    body.append(key, JSON.stringify(data[key]));
                } else {
                    body.append(key, data[key]);
                }
            }
        } else {
            body = data;
        }

        // perform fetch and return response (if any)
        return fetch('/ajax/' + endpoint, {
            method: 'POST',
            body: body,
            credentials: 'include'
        }).then(response => {
            try { if (JSON.parse(response.body)) return response.json() }
            catch (e) { return response; }
        });

    },

    /**
     * Classic key=value pairing post, with a form content-type. 
     * For old API endpoints that don't play well with modern methods.
     */
    classicPost(endpoint, data) {

        let body = '';

        // if object passed in, create key-value pair string of form data
        if (data !== null && typeof data !== 'undefined' && typeof data === 'object') {

            // iterate and compress objects down into json strings to pass
            for (let key in data) {
                if (data[key] !== null && typeof data[key] === 'object') {
                    data[key] = JSON.stringify(data[key]);
                } else {
                    body += (body === '' ? '' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
                }
            }
        } else {
            body = data;
        }

        // perform fetch and return result, setting old-style headers
        return fetch('/ajax/' + endpoint, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json, application/xml, text/javascript, text/plain, text/html, *.*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' 
            },
            credentials: 'include'
        }).then(response => response.json());
    },

    put(endpoint, data) {
        return fetch('/ajax/' + endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }
};


export default http;