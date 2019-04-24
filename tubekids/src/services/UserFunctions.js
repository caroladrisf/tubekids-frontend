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

export const sendEmail = id => {
    return API
        .post(`users/${id}/confirmation-email`)
        .then(res => {
            return res.status
        })
        .catch(err => {
            if (err.response) {
                return err.response.data
            }
        });
}

export const confirmEmail = id => {
    return API
        .get(`users/${id}/confirm`)
          .then(res => {
                return res.data
        })
        .catch(err => {
            if (err.response) {
                return false
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

export const sendSMS = () => {
    return API
        .post(`users/${localStorage.getItem('userId')}/sms`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
        })
        .then(res => {
            return res.status
        })
        .catch(err => {
            if (err.response) {
                return err.response.data
            }
        });
}

export const verifyCode = code => {
    return API
        .put(`users/${localStorage.getItem('userId')}/code`, {code}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            if (err.response) {
                return err.response.data
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
