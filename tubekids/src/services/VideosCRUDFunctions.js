import API from './api';

export const getPlaylist = () => {
    return API
        .get('videos', {
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

export const searchByName = name => {
    return API
        .get('videos', { 
            params: { name }, 
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

export const createVideo = video => {
    return API
        .post('videos', video, {
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

export const showVideo = id => {
    return API
        .get(`videos/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
            }
        });
}

export const updateVideo = video => {
    return API
        .put(`videos/${video.id}`, video, {
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

export const deleteVideo = id => {
    return API
        .delete(`videos/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
        })
        .then(res => {
            return res.status === 204;
        })
        .catch(err => {
            if (err.response) {
                return false;
            }
        });
}
