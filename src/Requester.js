const http = require('http');

function Requester() {}

Requester.prototype.getRequest = function (userInput, fn) {
  var options;

  options = {
    'host': userInput.split('/')[0],
    'path': this._getPath(userInput),
    'port': 80
  };

  this._fetcher(options, fn);
};

Requester.prototype._fetcher = function(options, fn) {
  var page;

  page = '';

  http.get(options, function(resp) {
    resp.setEncoding('utf8');
    resp.on('data', function(chunk) {
      page += chunk;
    });
    resp.on('end', function() {
      fn(page);
    });
  }).on("error", function(err) {
    console.log(`Got error: ${err.message}`);
  });
}

Requester.prototype._getPath = function (userInput) {
  var userInputArray = userInput.split('/');

  if (userInput.split('/')[1]) {
    return `/${userInputArray.slice(1, userInputArray.length).join('/')}`;
  }
  return '/';
};


module.exports = Requester;
