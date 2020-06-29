import axios from 'axios';

const axiosInstance = axios.create()
axiosInstance.interceptors.response.use((response) =>{
    return response
}, (error) =>{
    const errorResponse = error.response
    if (isExpiredToken(errorResponse)){

    }
} )

const isExpiredToken = (error) =>{
    return error.status === 401 || error.status === 403
}
const resetTokenAndReattemptRequest = (error) => {
    const { response: errorResponse } = error;
    axios.post('/token', {refreshToken: localStorage.getItem("refreshToken")})
        .then(response => response.data)
        .then(data => localStorage.setItem("accessToken", data))
        .catch(err => {
            console.log(err)
        })
    const retryOriginalRequest = new Promise(resolve => {

    })
}
export default axiosInstance