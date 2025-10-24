import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://172.19.70.249.nip.io',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

    }, (error) => {
        return Promise.reject(error);
    });

export default apiClient;
