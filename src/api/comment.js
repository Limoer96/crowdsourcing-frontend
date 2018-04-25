import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
  comment: (data) => axios.post(`${BASE_URL}/api/comments/upload`, { data }).then(res => res.data),
  getCommentInfo: (data) => axios.get(`${BASE_URL}/api/comments/list?d_id=${data.d_id}`).then(res => res.data),
  getCommentsByUserId: (data) => axios.get(`${BASE_URL}/api/comments/filter?u_id=${data.userId}`).then(res => res.data)
}

