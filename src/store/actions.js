/**
 * Created by ww on 2017/9/4.
 */
import * as types from './mutation_types';
import { shuffle } from '@/common/js/utils';
import { playMode } from '@/common/js/config';
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  savePlay
} from '@/common/js/cache';
import favorite from '@/api/favorite';

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  });
}

export const selectPlay = ({ commit, state }, { list, index }) => {
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const randomPlay = ({ commit }, { list }) => {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQUENCE_LIST, list);
  let randomList = shuffle(list);
  commit(types.SET_PLAYLIST, randomList);
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const insertSong = ({ commit, state }, song) => {
  let playList = state.playList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  // 记录正在播放的歌曲
  let currentSong = playList[currentIndex];
  // 查找当前播放列表是否有要插入的歌曲
  let fpIndex = findIndex(playList, song);

  currentIndex++;
  playList.splice(currentIndex, 0, song);

  if (fpIndex > -1) {
    // 如果旧歌曲 索引 < 插入歌曲索引
    if (fpIndex < currentIndex) {
      currentIndex--;
      playList.splice(fpIndex, 1);
    } else {
      playList.splice(fpIndex + 1, 1);
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1;
  let fsIndex = findIndex(sequenceList, song);
  sequenceList.splice(currentSIndex, 0, song);
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  commit('SET_PLAYLIST', playList);
  commit('SET_SEQUENCE_LIST', sequenceList);
  commit('SET_CURRENT_INDEX', currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const saveSearchHistory = ({ commit }, query) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};

export const deleteSearchHistory = ({ commit }, query) => {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
};

export const clearSearchHistory = ({ commit }) => {
  commit(types.SET_SEARCH_HISTORY, clearSearch());
};

export const deleteSong = ({ commit, state }, song) => {
  let playList = state.playList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let pIndex = findIndex(playList, song);
  playList.splice(pIndex, 1);
  let sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--;
  }
  commit('SET_PLAYLIST', playList);
  commit('SET_SEQUENCE_LIST', sequenceList);
  commit('SET_CURRENT_INDEX', currentIndex);

  let playingState = playList.length > 0;
  commit(types.SET_PLAYING_STATE, playingState);
};

export const deleteSongList = ({ commit }) => {
  commit('SET_PLAYLIST', []);
  commit('SET_SEQUENCE_LIST', []);
  commit('SET_CURRENT_INDEX', -1);
  commit(types.SET_PLAYING_STATE, false);
};

export const savePlayHistory = ({ commit }, song) => {
  commit(types.SET_PLAY_HISTORY, savePlay(song));
};
// 收藏-save
export const saveFavoriteList = ({ commit, state }, song) => {
  favorite
    .save(state.userinfo.objectId, song)
    .then(res => {
      if (res) commit(types.SET_FAVORITE_LIST, res);
    })
    .catch(() => {});
};
// 收藏-del
export const deleteFavoriteList = ({ commit, state }, song) => {
  favorite
    .delete(state.userinfo.objectId, song)
    .then(res => {
      if (res) commit(types.SET_FAVORITE_LIST, res);
    })
    .catch(() => {});
};

export const setUserInfo = ({ commit }, info) => {
  if (info) {
    favorite.find(info.objectId).then(res => {
      let list = [];
      if (res.songlist) {
        list = JSON.parse(res.songlist);
      }
      commit(types.SET_FAVORITE_LIST, list);
    });
  }
  commit(types.SET_USERINFO, info);
};
