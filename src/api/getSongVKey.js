/**
 * Created by ww on 2017/9/13.
 */
import jsonp from '@/common/js/jsonp';
import { commonParamas, options } from './config';

export function getSongVKey(id) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  const a = `MusicJsonCallback${Math.random()
    .toString()
    .replace('0.', '')}`;
  const data = Object.assign({}, commonParamas, {
    loginUin: 0,
    hostUin: 0,
    needNewCode: 1,
    cid: '205361747',
    songmid: id,
    filename: `c400${id}.m4a`,
    uin: '2282701371',
    guid: '4216154655',
    platform: 'yqq',
    callback: a
  });
  options.name = a;
  return jsonp(url, data, options);
}
