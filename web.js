var express = require('express'),
    connect = require('connect');

var app = express.createServer(
    express.static(__dirname + '/public'),
    express.logger()
);

app.get('/', function(request, response) {
  response.sendfile('public/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
