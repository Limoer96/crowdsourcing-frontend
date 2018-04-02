import axios from 'axios';
import qs from 'qs';
const BASE_URL = 'http://localhost:3000';
export default {
  auth: (payload) => axios.post(`${BASE_URL}/api/users/auth`, qs.stringify(payload)).then(res => res.data),
  getVC: (payload) => axios.post(`${BASE_URL}/api/users/auth_vc`, qs.stringify(payload)).then(res => res.data),
  regist: (payload) => axios.post(`${BASE_URL}/api/users/regist`, qs.stringify(payload)).then(res => res.data),
  checkIdValidate: (payload) => axios.post(`${BASE_URL}/api/users/check_id_validation`, qs.stringify(payload)).then(res => res.data),
  sendResetPasswordMail: (payload) => axios.post(`${BASE_URL}/api/users/send_reset_email`, qs.stringify(payload)).then(res => res.data),
  resetPassword: (data) => axios.post(`${BASE_URL}/api/users/reset_password`, qs.stringify(data)).then(res => res.data)
}
