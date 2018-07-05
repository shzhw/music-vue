/* eslint-disable no-undef */
const users = {
  add: function(params) {
    return new Promise((resolve, reject) => {
      Bmob.User.register(params)
        .then(res => {
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
