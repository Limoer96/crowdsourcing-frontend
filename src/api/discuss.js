import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export default {
  publish: (data) => axios.post(`${BASE_URL}/api/discusses/upload`, { data }).then(res => res.data)
}
