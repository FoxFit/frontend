import { AuthProvider } from 'react-admin';
import { API_URL } from '@/constants';

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        const headers = new Headers({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        });
        const request = new Request(API_URL + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ user_name : username, password }),
            headers: headers,
        })
        return fetch(request)
            .then(response => {
                // if (response.status < 200 || response.status >= 300) {
                //     throw new Error(response.statusText);
                // }
                return response.json();
            })
            .then((response) => {
                if (response.status !== 'success') {
                    throw new Error(response.message || response.error);
                }
                console.log(response.data);
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            });
    },
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('user') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(),
    getIdentity: () => {
        const user = JSON.parse(localStorage.getItem('user') || '');
        return Promise.resolve({
            id: user.id,
            fullName: user.full_name,
            // avatar: null
        });
    }
};

export default authProvider;