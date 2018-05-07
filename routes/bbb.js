var express = require('express');
var router = express.Router();

var http = require('https');


router.get('/', function(req, res, next) {
  var cm_host = 'card.mona.jp';
  var cm_path = '/api/card_detail?assets=UNAGI';
  var cm_query = ''
  var cm_url = 'https://' + cm_host + cm_path + cm_query;

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
      var body_json = JSON.parse(body);
      console.log('IMGUR: ' + body_json['details'][0]['imgur_url'])
      var data = {
        title: 'Index!!',
        content: body,
        url: cm_url,
        imgur_url: body_json['details'][0]['imgur_url'],
      };
      res.render('bbb', data);
    });
  });
  cm_req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });
  cm_req.end();
  
});

module.exports = router;