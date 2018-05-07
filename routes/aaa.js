var express = require('express');
var router = express.Router();

var http = require('https');


router.get('/', function(req, res, next) {
  var cm_host = 'card.mona.jp';
  var cm_path = '/api/card_list';
  var cm_url = 'https://' + cm_host + cm_path;

  var options = {
    host: cm_host,
    port: 443,
    path: cm_path,
    method: 'GET'
  };
  var cm_req = http.request(options, function(cm_res){
    console.log('STATUS: ' + cm_res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(cm_res.headers));
    cm_res.setEncoding('utf8');
    var body = '';
    cm_res.on('data', (chunk) => {
      body += chunk;
    });
    cm_res.on('end', function(){
      var data = {
        title: 'Index!!',
        content: body,
        url: cm_url,
      };
      res.render('aaa', data);
    });
  });
  cm_req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });
  cm_req.end();
  
});

module.exports = router;
