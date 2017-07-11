/**
 * Created by Administrator on 2017-07-08.
 */
import jsonp from '@/common/js/jsonp.js';
import {commonParamas, options} from './config.js';

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParamas, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    g_tk: 1242708701,
    platform: 'yqq'
  });
  return jsonp(url, data, options);
};
