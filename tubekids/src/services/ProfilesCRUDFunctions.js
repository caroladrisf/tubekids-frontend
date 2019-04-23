import API from './api';

export const getProfiles = () => {
    return API
        .get('profiles', {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
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

export const createProfile = profile => {
    return API
        .post('profiles', profile, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
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

export const updateProfile = profile => {
    return API
        .put(`profiles/${profile.id}`, profile, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
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

export const deleteProfile = id => {
    return API
        .delete(`profiles/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
        })
        .then(res => {
            return res.status === 204;
        })
        .catch(err => {
            return false;
        });
}
