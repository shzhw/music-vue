/**
 * Created by ww on 2017/9/5.
 */
import { getLyric } from '@/api/song';
import { getSongVKey } from '@/api/getSongVKey';
import { ERR_OK } from '@/api/config';
import Base64 from 'js-base64';

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid)
        .then(res => {
          if (res.retcode === ERR_OK) {
            this.lyric = Base64.decode(res.lyric);
            resolve(this.lyric);
            // console.log(this.lyric);
          } else {
            reject('no lyric');
          }
        })
        .catch(e => {
          reject('no lyric');
        });
    });
  }
  getVKey() {
    if (this.vkey) {
      return Promise.resolve(this.vkey);
    } else {
      return new Promise((resolve, reject) => {
        getSongVKey(this.mid)
          .then(res => {
            if (res.code === ERR_OK) {
              this.vkey = res.data.items[0].vkey;
              this.url = `http://dl.stream.qqmusic.qq.com/C400${
                this.mid
              }.m4a?guid=4216154655&vkey=${this.vkey}&uin=0&fromtag=38`;
              resolve(this.vkey);
            } else {
              reject('no vkey');
            }
          })
          .catch(e => {
            reject('no vkey');
          });
      });
    }
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `//y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`
    // url: `http://isure.stream.qqmusic.qq.com/c400${
    //   musicData.songmid
    // }.m4a?fromtag=46`
  });
}

function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach(s => {
    ret.push(s.name);
  });
  return ret.join('/');
}
