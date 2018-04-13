import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
export default {
  uploadData: (data) => axios.post(`${BASE_URL}/api/answers/upload`, { data }).then(res => res.data),
  getAnswer: (data) => axios.get(`${BASE_URL}/api/answers/info?a_id=${data.a_id}`).then(res => res.data),
  confirmAnswer: (data) => axios.get(`${BASE_URL}/api/answers/confirm?a_id=${data.a_id}`).then(res => res.data),
  rejectAnswer: (data) => axios.get(`${BASE_URL}/api/answers/reject?a_id=${data.a_id}`).then(res => res.data)
}
