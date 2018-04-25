import axios from 'axios';
import qs from 'qs';
const BASE_URL = 'http://localhost:3000';

export default {
  addTask: (data) => axios.post(`${BASE_URL}/api/tasks/addone`, data).then(res => res.data),
  getTaskInfo: (data) => axios.get(`${BASE_URL}/api/tasks/gettaskinfo?t_id=${data.t_id}`).then(res => res.data),
  closeTask: (data) => axios.get(`${BASE_URL}/api/tasks/close_one?t_id=${data.t_id}`).then(res => res.data),
  receiveTask: (data) => axios.get(`${BASE_URL}/api/tasks/reveive_task?t_id=${data.t_id}`).then(res => res.data),
  getTaskListMultConditions: (data) => axios.post(`${BASE_URL}/api/tasks/tasks_list_mult_conditions`, data).then(res => res.data),
  getMapTasks: () => axios.get(`${BASE_URL}/api/tasks/map`).then(res => res.data) 
}
