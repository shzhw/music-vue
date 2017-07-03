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
