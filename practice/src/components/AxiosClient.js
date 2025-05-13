import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: 'https://todo-backend-zwg4.onrender.com',
    timeout: 10000, // wait-time for the response 
});

export default AxiosClient;

