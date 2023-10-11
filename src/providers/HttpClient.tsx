import {fetchUtils} from "react-admin";

const httpClient = (url: string, options = {}) => {
    if (!options.hasOwnProperty('headers')) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('Content-Type', 'application/json');
    options.headers.set('Accept', 'application/json');
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    // options.headers.set("Access-Control-Allow-Origin", "*");
    // options.headers.set("Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    return fetchUtils.fetchJson(url, options);
}

export default httpClient;