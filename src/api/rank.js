/**
 * Created by ww on 2017/9/13.
 */
import jsonp from '@/common/js/jsonp';
import {commonParamas, options} from './config';

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  const data = Object.assign({}, commonParamas, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  });
  return jsonp(url, data, options);
}

export function getMusicList(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  const data = Object.assign({}, commonParamas, {
    platform: 'h5',
    page: 'detail',
    type: 'top',
    tpl: 3,
    needNewCode: 1,
    format: 'jsonp',
    topid: id
  });
  return jsonp(url, data, options);
}

