import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-7f125.firebaseio.com/"
});

export default instance;