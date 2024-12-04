// Create web server
// Usage: node comments.js

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
var port = 8080;

var server = http.createServer(function (request, response) {
  // Parse URL
  var urlParsed = url.parse(request.url, true);
  console.log(urlParsed);

  // Handle GET request
  if (urlParsed.pathname == '/comments') {
    // Set response headers
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Send comments
    response.end(JSON.stringify(comments));
  }
  // Handle POST request
  else if (urlParsed.pathname == '/addComment') {
    // Read data from request
    var body = '';
    request.on('data', function (chunk) {
      body += chunk;
    }).on('end', function () {
      // Parse data
      var comment = JSON.parse(body);
      comment.date = new Date();
      comments.push(comment);

      // Send response
      response.end(JSON.stringify({ status: 'OK' }));
    });
  }
  else {
    // Handle other requests
    response.statusCode = 404;
    response.end('Not Found');
  }
});

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});