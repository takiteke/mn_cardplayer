var express = require('express');
var router = express.Router();
var http = require('https');


router.get('/', function(req, res, next) {
  var mp_host = 'wallet.monaparty.me';
  var mp_path = '/_api';
  var mp_url = 'https://' + mp_host + mp_path;
  
  /*var postData = {
    "jsonrpc": "2.0",
    "id": 0,
    "method": "get_chain_block_height", 
  };*/
  var mp_postData = {
    "jsonrpc": "2.0",
    "id": 0,
    "method": "get_normalized_balances", 
    "params": {
      "addresses": ["MNtDued3uuyX625NySLbD4ma3DVsZUTdkH"],
    },
  };

  var mp_postDataStr = JSON.stringify(mp_postData);

  var options = {
    host: mp_host,
    port: 443,
    path: mp_path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': mp_postDataStr.length
    }
  };
  var mp_req = http.request(options, function(mp_res){
    console.log('STATUS: ' + mp_res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(mp_res.headers));
    mp_res.setEncoding('utf8');
    var body = '';
    mp_res.on('data', (chunk) => {
      body += chunk;
    });
    mp_res.on('end', function(){
      var body_json = JSON.parse(body);
      var data = {
        title: 'Index!!',
        cards: body,
      };
      res.render('index', data);
    });
  });
  mp_req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });
  mp_req.write(mp_postDataStr);
  mp_req.end();
});

module.exports = router;