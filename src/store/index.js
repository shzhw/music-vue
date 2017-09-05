/**
 * Created by ww on 2017/9/4.
 */
import Vuex from 'vuex';
import Vue from 'vue';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger'; // 通过mutation方式修改state  会在控制台 打印详情

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'; // vuex 调试

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

