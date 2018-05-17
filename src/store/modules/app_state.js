import types from '../type';

const state = {
  canUseMapSearch: true
}

const mutations = {
  [types.CAN_NOT_USE_MAP_SEARCH](state) {
    state.canUseMapSearch = false
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