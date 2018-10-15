import axios from 'axios'

const instance = axios.create({
 baseURL : 'https://my-burger-application.firebaseio.com/'
});

export default instance;