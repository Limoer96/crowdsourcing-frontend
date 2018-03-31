import api from '../../api/auth';
import types from '../type';
import setTokenHeader from '../../util/settokenheader';
const state = {
  userName: '',
  token: null,
  loading: false,
  error: '',
  vc_send: false
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
    api.auth(payload.data).then(json => {
      const status = json.status;
      if(status === 10) {
        commit(types.AFTER_RESPONSE);
        localStorage.setItem("email", payload.data.email);
        payload.router.push(`/regist`);
      }else if(status === 0) {
        // 正常的密码登录
        payload.alert.success('登录成功！');
        const { token } = json.data;
        commit(types.AUTH_SUCCESS_AND_SAVE_TOKEN, { userName: payload.data.user_id, token: token })
        commit(types.AFTER_RESPONSE);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', payload.data.user_id);
        setTokenHeader(token);
        setTimeout(() => {
          payload.router.push('/dashbord');
        }, 1000);
      }
    }).catch(err => {
      commit(types.AUTH_FAILED, { error: err.response.data.error });
      commit(types.AFTER_RESPONSE);
      payload.alert.fail(state.error); //错误提示
    })
  },
  getVC({ commit, state }, payload) {
    api.getVC(payload.data).then((json) => {
      state.vc_send = true;
      payload.alert.success('发送成功');
    }).catch(err=> {
      payload.alert.fail('发送失败');
    })
  },
  regist({ commit, state }, payload) {
    api.regist(payload.data).then((json) => {
      payload.alert.success('登录成功！');
      localStorage.setItem('userName', payload.data.userId);
      localStorage.setItem('token', json.data.token);
      setTokenHeader(json.data.token);
        setTimeout(() => {
          payload.router.push('/dashbord');
        }, 1000);
    }).catch(err => {
      console.log(err);
      payload.alert.fail('注册失败');
    })
  },
  checkUserId(context, payload) {
    api.checkIdValidate(payload.data).then(json => {
      payload.alert.success('该用户名可用');
    }).catch(err => {
      payload.alert.fail('当前用户名不可用');      
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}


