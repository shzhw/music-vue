/**
 * Created by ww on 2017/9/18.
 */
import storage from 'good-storage';
import { insertArray, deleteFromArray } from './utils';

const SEARCH_KEY = '__serach__';
const SEARCH_MAX_LENGTH = 15;
const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;
const USERINFO_KEY = 'bmob';

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  insertArray(
    searches,
    query,
    item => {
      return item === query;
    },
    SEARCH_MAX_LENGTH
  );
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, []);
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, item => {
    return item === query;
  });
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, []);
  insertArray(
    songs,
    song,
    item => {
      return item.id === song.id;
    },
    PLAY_MAX_LENGTH
  );
  storage.set(PLAY_KEY, songs);
  return songs;
}

export function loadPlay() {
  return storage.get(PLAY_KEY, []);
}

export function clearUserInfo() {
  return storage.set(USERINFO_KEY, '');
}
