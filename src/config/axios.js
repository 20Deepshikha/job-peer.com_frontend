import axios from 'axios'

//setting the base url for ease
const api = axios.create({
    // baseURL: 'http://localhost:8000/jat/'
    baseURL: 'https://job-peer.onrender.com/jat'
});

export default api;