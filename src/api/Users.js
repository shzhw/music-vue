/* eslint-disable no-undef */
const users = {
  add: function(params) {
    return new Promise((resolve, reject) => {
      Bmob.User.register(params)
        .then(res => {
          // 创建关联字段对象
          const pointer = Bmob.Pointer('_User');
          const userid = pointer.set(res.objectId);
          // Favorite添加一行
          const query = Bmob.Query('Favorite');
          query.set('userid', userid);
          query.set('songlist', '[]');
          query.save();
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  login: function({ username, password }) {
    return new Promise((resolve, reject) => {
      Bmob.User.login(username, password)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getUserinfo: function() {
    return Bmob.User.current();
  }
};

export default users;
