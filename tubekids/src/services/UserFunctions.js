import API from './api';

export const register = user => {
    return API
        .post('users', user)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            if (err.response) {
                return err.response.data;
            }
        });
}

export const login = credentials => {
    return API
        .post('users/session', credentials)
        .then(res => {
            if (res.data.token) {
                return res.data;
            }
        })
        .catch(err => {
            if (err.response) {
                return err.response.data;
            }
        });
}

export const getUser = () => {
    return API
        .get('user', {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
        })
        .then(res => {
            return res.data;
        })
        .catch(
            err => console.error(err)
        );
}

export const logout = () => {
    return API
        .delete('users/session', {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            if (err.response) {
                return err.response.data;
            }
        });
}
