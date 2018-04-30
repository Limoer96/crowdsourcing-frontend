import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
  auth: (data) => axios.post(`${BASE_URL}/api/admins/auth`, { data }).then(res => res.data),
  getDataDetail: (data) => axios.get(`${BASE_URL}/api/admins/data?t=${data.token}`).then(res => res.data),
  getTasks: (data) => axios.get(`${BASE_URL}/api/admins/tasks?t=${data.token}`).then(res => res.data),
  closeTask: (data) => axios.post(`${BASE_URL}/api/admins/close_task`, { data }).then(res => res.data),
  getAnswers: (data) => axios.get(`${BASE_URL}/api/admins/answers?t=${data.token}`).then(res => res.data),
  rejectAnswer: (data) => axios.post(`${BASE_URL}/api/admins/arbitration_reject`, { data }).then(res => res.data),
  resolveAnswer: (data) => axios.post(`${BASE_URL}/api/admins/arbitration_resolve`, { data }).then(res => res.data)
}
