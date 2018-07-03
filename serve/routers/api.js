var express = require('express');

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
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = apiRoutes;
