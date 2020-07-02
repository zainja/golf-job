import axios from 'axios';

const userAxios = axios.create()

const interceptor = userAxios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status !== 401) {
        return Promise.reject(error)
    }
    if (error.config.url === '/token') {
        localStorage.clear()
    }
    axios.interceptors.response.eject(interceptor);

    return axios.post('/token/', {
        refreshToken: localStorage.getItem('refresh-token')
    }).then(response => response.data)
        .then(data => {
            localStorage.setItem("access-token", data.accessToken)
            error.response.config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token');
            return axios(error.response.config);
        }).catch(err => {
            localStorage.clear()
            return Promise.reject(error);
        })
})
export default userAxios