import auth from '../../api/auth';
import types from '../type';

const state = {
  userName: 'Limoer',
  token: null,
  loading: false,
  error: ''
};
const getters = {
  isLogin: (state) => state.token !== null
}
const mutations = {
  [types.WAIT_FOR_RESPONSE](state) {
    state.loading = true;
  },
  [types.AFTER_RESPONSE](state) {
    state.loading =false;
  },
  [types.AUTH_SUCCESS_AND_SAVE_TOKEN](state, { userName, token }) {
    state.userName = userName;
    state.token = token;
  },
  [types.AUTH_FAILED](state, { error }) {
    state.error = error;
  } 
};
const actions = {
  auth({ commit, state }, payload) {
    // 模拟登录
    commit(types.WAIT_FOR_RESPONSE);
    setTimeout(() => {
      commit(types.AUTH_SUCCESS_AND_SAVE_TOKEN, { userName: 'limoer', token: 'abs25674limoer' })  
    }, 2000)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}


