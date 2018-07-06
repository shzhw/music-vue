import { insertArray, deleteFromArray } from '@/common/js/utils';

/* eslint-disable no-undef */
const favorite = {
  FAVORITE_MAX_LEGTH: 200,
  find(id) {
    return new Promise((resolve, reject) => {
      // userid  User表Pointer对象
      const pointer = Bmob.Pointer('_User');
      const userid = pointer.set(id);

      const query = Bmob.Query('Favorite');
      // userid 字段名称关联用户表 ，类型Pointer
      query.equalTo('userid', '==', userid);
      query
        .find()
        .then(res => {
          resolve(res[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  save(id, song) {
    const pointer = Bmob.Pointer('_User');
    const userid = pointer.set(id);
    const query = Bmob.Query('Favorite');
    // userid 字段名称关联用户表 ，类型Pointer
    query.equalTo('userid', '==', userid);
    return new Promise((resolve, reject) => {
      query
        .find()
        .then(res => {
          let songs = JSON.parse(res[0].songlist);
          insertArray(
            songs,
            song,
            item => {
              return item.id === song.id;
            },
            this.FAVORITE_MAX_LENGTH
          );
          res.set('songlist', JSON.stringify(songs));
          res
            .saveAll()
            .then(() => {
              resolve(songs);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(id, song) {
    const pointer = Bmob.Pointer('_User');
    const userid = pointer.set(id);
    const query = Bmob.Query('Favorite');
    // userid 字段名称关联用户表 ，类型Pointer
    query.equalTo('userid', '==', userid);
    return new Promise((resolve, reject) => {
      query
        .find()
        .then(res => {
          let songs = JSON.parse(res[0].songlist);
          deleteFromArray(songs, item => {
            return item.id === song.id;
          });
          res.set('songlist', JSON.stringify(songs));
          res
            .saveAll()
            .then(() => {
              resolve(songs);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default favorite;
