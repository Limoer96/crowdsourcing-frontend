import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export default {
  pay: (data) => axios.post(`${BASE_URL}/api/records/pay`, { data }).then(res => res.data)
}