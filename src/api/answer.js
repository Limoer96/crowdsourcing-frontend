import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
export default {
  uploadData: (data) => axios.post(`${BASE_URL}/api/answers/upload`, { data }).then(res => res.data)
}