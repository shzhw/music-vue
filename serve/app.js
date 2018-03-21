/**
 * Created by ww on 2017/10/18.
 */
var express = require('express');
var axios = require('axios');
var api = require('./routers/api');
var page = require('./routers/page');
var ejs = require('ejs');

var app = express();

app.engine('html', ejs.renderFile);
app.set('views', './dist');
app.set('view engine', 'html');
app.set('view cache', false);

app.use('/static', express.static('./dist/static'));

app.use('/api', api);
app.use('/', page);

var port = 8080;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listen at http://localhost:' + port + '\n');
});
