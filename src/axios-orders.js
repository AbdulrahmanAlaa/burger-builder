import axios from 'axios';
const instance  = axios.create({
    baseURL:'https://burger-builder-decb8.firebaseio.com/'
});
export default instance