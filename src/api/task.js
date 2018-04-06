import axios from 'axios';
import qs from 'qs';
const BASE_URL = 'http://localhost:3000';

export default {
  addTask: (data) => axios.post(`${BASE_URL}/task/addone`, qs.stringify(data)).then(res => res.data)
}

