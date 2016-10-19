/**
 * Created by suzanne on 10/18/16.
 */

//User Story: I can get the
//  IP address,
//  language
//  operating system for my browser.

var express = require('express');
var app = express();
//var http = require('http');
var parser = require('ua-parser-js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static('.'));

app.use(function(req, res, next){
  //console.log(req.headers);
  //req.ua = req.headers['user-agent'];
  var langStr = parser(req.headers['accept-language']);
  console.log(langStr);
  req.lang = langStr.ua.toString().split(',')[0];
  req.ua = parser(req.headers['user-agent']);
  // write the result as response

  //req.ip = req.headers
next();
})

app.use(function(request, response, next) {
  request.chance = Math.random();
next();
})

app.get('/chance', function (request, response){
  response.json({
    chance: request.chance,
  })
})



app.get("/",function(req,res){
  res.send('index.html');
});

app.get('/api/whoami', function(request, response) {

  //response.end(JSON.stringify(request.ua, null, '  '));

  response.json({
    ip6address: request.ip,
    language: request.lang,
    software: (request.ua.os.name + ", " + request.ua.os.version)
  })



});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});