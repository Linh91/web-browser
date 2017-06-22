var http = require('http');

function Requester() {}

Requester.prototype.fetcher = function (webUrl, fn) {
  var page = '';

  var options = {
    host: webUrl,
    port: 80,
    path: '/'
  };

  http.get(options, function(resp) {
    resp.setEncoding('utf8');
    resp.on('data', function(chunk) {
      page += chunk;
      fn(page);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};

module.exports = Requester;
