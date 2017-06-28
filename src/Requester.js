var http = require('http');

function Requester() {}

Requester.prototype.fetcher = function (userInput, fn) {
  var page = '';

  var options = {
    host: userInput.split('/')[0],
    port: 80,
    path: this._getPath(userInput)
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

Requester.prototype._getPath = function (userInput) {
  var userInputArray = userInput.split('/');

  if ( userInput.split('/')[1] ) {
    return '/' + userInputArray.slice(1, userInputArray.length).join('/');
  } else {
    return '/';
  }
};

module.exports = Requester;
