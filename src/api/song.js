/**
 * Created by ww on 2017/9/11.
 */
import {commonParamas} from './config.js';
import axios from 'axios';

export function getLyric(mid) {
  const url = 'api/lyric';
  const data = Object.assign({}, commonParamas, {
    songmid: mid,
    pcachetime: +new Date(),
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
