import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
  auth: (data) => axios.post(`${BASE_URL}/api/admins/auth`, { data }).then(res => res.data),
  getDataDetail: (data) => axios.get(`${BASE_URL}/api/admins/data?t=${data.token}`).then(res => res.data)
}
