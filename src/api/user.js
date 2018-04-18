import axios from 'axios';
import qs from 'qs';
const BASE_URL = 'http://localhost:3000';

export default {
  getUserInfo: (data) => axios.post(`${BASE_URL}/api/users/user_info`, qs.stringify(data)).then(res => res.data),
  getPublishTasks: (data) => axios.get(`${BASE_URL}/api/users/publish_tasks?u=${data.user}&p=${data.page}`, qs.stringify(data)).then(res => res.data),
  getReceiveTasks: () => axios.get(`${BASE_URL}/api/users/receive_tasks`).then(res => res.data)
}
