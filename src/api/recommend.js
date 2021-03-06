/**
 * Created by Administrator on 2017-07-03.
 */
import jsonp from '@/common/js/jsonp';
import {commonParamas, options} from './config';
import axios from 'axios';

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParamas, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

export function getDiscList() {
  const url = '/api/getDiscList';
  const data = Object.assign({}, commonParamas, {
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    sortId: 5,
    ein: 29,
    sin: 0,
    categoryId: 10000000,
    rnd: Math.random()
  });
  return axios
    .get(url, { params: data })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(e => { return Promise.reject(e); });
}

export function getSongList(disstid) {
  const url = `/api/songlist`;
  const data = Object.assign({}, commonParamas, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    g_tk: 1768473683,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 1,
    format: 'json'
  });
  return axios
    .get(url, { params: data })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(e => {
      return Promise.reject(e);
    });
}
