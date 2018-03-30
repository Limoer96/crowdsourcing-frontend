import axios from 'axios';

export default {
  auth: (payload) => axios.post('/api/auth/login', { payload }).then(res => res.data)
}
