/**
 * Created by ww on 2017/9/4.
 */
import { playMode } from '@/common/js/config';
import { loadSearch, loadPlay } from '@/common/js/cache';

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: [],
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: [],
  userinfo: null,
  alert: {
    text: '',
    isShow: false,
    hidecbk: null
  }
};

export default state;
