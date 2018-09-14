var express = require('express');
var axios = require('axios');

var app = express();

var apiRoutes = express.Router();
apiRoutes.get('/getDiscList', function(req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  axios
    .get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/playlist.html',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

apiRoutes.get('/lyric', function(req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios
    .get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/player.html',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

apiRoutes.get('/songlist', function(req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  axios
    .get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/player.html',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      // 这个请求会将cbk的开头__去掉，原因未知
      res.send('__' + response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

apiRoutes.get('/search', function(req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  axios
    .get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/player.html',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

apiRoutes.get('/test', function(req, res) {
  res.send('this is api test');
});

module.exports = apiRoutes;
