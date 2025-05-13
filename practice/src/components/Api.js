import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://todo-backend-zwg4.onrender.com/todo/',
    timeout: 10000,
});

export default Api;
