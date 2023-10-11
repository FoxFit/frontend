import { AuthProvider } from 'react-admin';
import { API_URL } from '@/constants';

const authProvider: AuthProvider = {
    // Send username and password to the auth server and get back credentials.
    login: ({ username, password }) => {
        const request = new Request(API_URL + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ user_name : username, password }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
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
    // Remove local credentials and notify the auth server that the user logged out.
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // When the dataProvider returns an error, check if this is an authentication error.
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // When the user navigates, make sure that their credentials are still valid.
    checkAuth: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return Promise.reject();
        }

        const checkHeaders = new Headers({
            'Content-Type': 'application/json',
        });
        checkHeaders.set('Authorization', `Bearer ${token}`);

        const request = new Request(API_URL + '/auth/check', {
            method: 'GET',
            headers: checkHeaders,
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Expired token! Please login again.');
                }
                return response.json();
            })
            .then((response) => {
                if (response.status == 'success') {
                    return Promise.resolve();
                }
                return Promise.reject();
            });
    },
    // Get the user's profile.
    getIdentity: () => {
        const user = JSON.parse(localStorage.getItem('user') || '');
        return Promise.resolve({
            id: user.id,
            fullName: user.full_name,
            // avatar: null
        });
    },
    // Get the user permissions (optional)
    getPermissions: () => Promise.resolve(),
};

export default authProvider;