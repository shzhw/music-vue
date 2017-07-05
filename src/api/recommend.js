/**
 * Created by Administrator on 2017-07-03.
 */
import jsonp from '@/common/js/jsonp';
import {commonParamas, options} from './config';

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
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
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
  return jsonp(url, data, options);
}
