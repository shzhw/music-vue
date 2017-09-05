/**
 * Created by ww on 2017/9/4.
 */
import * as types from './mutation_types';

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  }
};

export default mutations;
