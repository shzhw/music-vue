/**
 * Created by ww on 2017/9/11.
 */
import { commonParamas, options, proxyUrl } from './config.js';
import jsonp from '@/common/js/jsonp';

export function getLyric(mid) {
  const url = proxyUrl + '/api/lyric';
  const data = Object.assign({}, commonParamas, {
    songmid: mid,
    pcachetime: +new Date(),
    g_tk: 5381,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, options);
}
