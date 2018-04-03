import axios from 'axios';
import qs from 'qs';
const BASE_URL = 'http://localhost:3000';

export default {
  getUserInfo: (data) => axios.post(`${BASE_URL}/api/users/user_info`, qs.stringify(data)).then(res => res.data)
}