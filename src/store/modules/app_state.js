import types from '../type';

const state = {
  canUseMapSearch: true,
  loadAlert: true
}

const mutations = {
  [types.CAN_NOT_USE_MAP_SEARCH](state) {
    state.canUseMapSearch = false
  },
  [types.NOT_LOAD_MAP_LOADING_ALERT](state) {
    state.loadAlert = false;
  }
}

const getters = {};
const actions = {};

export default {
  state, 
  getters,
  mutations,
  actions
}