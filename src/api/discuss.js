import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export default {
  publish: (data) => axios.post(`${BASE_URL}/api/discusses/upload`, { data }).then(res => res.data),
  getDiscussesByPage: (data) => axios.get(`${BASE_URL}/api/discusses/pagination?page=${data.page}&page_size=${data.pageSize}`).then(res => res.data),
  getDiscussById: (data) => axios.get(`${BASE_URL}/api/discusses/info?d_id=${data.d_id}`).then(res => res.data),
  getDiscussByUserId: (data) => axios.get(`${BASE_URL}/api/discusses/profile_discuss?u_id=${data.u_id}`).then(res => res.data)
}
