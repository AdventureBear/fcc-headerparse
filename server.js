/**
 * Created by suzanne on 10/18/16.
 */

//User Story: I can get the
//  IP address,
//  language
//  operating system for my browser.

var express = require('express');
var app = express();
var http = require('http');

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next){
  console.log(req.headers);
  req.ua = req.headers['user-agent'];
  req.lang = req.headers['accept-language'];
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



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/whoami', function(request, response) {
  response.json({
    ipaddress: request.ip,
    language: request.lang,
    software: request.ua,
  })

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});