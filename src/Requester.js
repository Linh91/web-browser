var http = require('http');

function Requester() {}

Requester.prototype.fetcher = function (webUrl, fn) {
  var page = '';

  // the path is hard-coded as a forward slash, which means only top-level domains can currently be visited

  var options = {
    host: webUrl,
    port: 80,
    path: '/'
  };

  http.get(options, function(resp) {
    resp.setEncoding('utf8');
    resp.on('data', function(chunk) {
      page += chunk;
    });
    resp.on('end', function() {
      fn(page);
    })
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};

module.exports = Requester;
