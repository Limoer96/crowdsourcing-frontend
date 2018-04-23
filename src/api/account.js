import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
  getAccount: () => axios.get(`${BASE_URL}/api/accounts/get_account`).then(res => res.data),
  recharge: (data) => axios.post(`${BASE_URL}/api/accounts/recharge`, { data }).then(res => res.data)
}
