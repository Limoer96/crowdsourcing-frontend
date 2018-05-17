import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import app_state from './modules/app_state';
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    auth,
    app_state
  }
})
