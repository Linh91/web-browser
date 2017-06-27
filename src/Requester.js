var http = require('http');

function Requester() {}

Requester.prototype.fetcher = function (webUrl, fn) {
  var page = '';

  var options = {
    host: webUrl.split('/')[0],
    port: 80,
    path: this._getPath(webUrl)
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

Requester.prototype._getPath = function (webUrl) {
  var webUrlArray = webUrl.split('/');

  if ( webUrl.split('/')[1] ) {
    return '/' + webUrlArray.slice(1, webUrlArray.length).join('/');
  } else {
    return '/';
  }
};


module.exports = Requester;
