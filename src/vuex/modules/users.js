import VuexFire from 'vuexfire'

import * as types from '../types'

const state = {
  users: null,
  user: null,
  current_user: null,
};

const getters = {}

const mutations = {
      [types.ADD_USER](state,user) {

      },
      [types.DELETE_USER](state,user) {

      },
      [types.UPDATE_USER](state,user) {

      },
      [types.GET_USER](state,user) {

      },
      [types.CURRENT_USER](state,user) {

      },
    }
export default {
  state,
  getters,
  mutations
}

