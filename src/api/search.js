/**
 * Created by ww on 2017/9/15.
 */
import jsonp from '@/common/js/jsonp';
import { commonParamas, options, proxyUrl } from './config';

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({}, commonParamas, {
    platform: 'h5',
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

export function search(query, page, zhida, perpage) {
  const url = proxyUrl + '/api/search';
  const data = Object.assign({}, commonParamas, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    uin: 0
  });
  return jsonp(url, data, options);
}
