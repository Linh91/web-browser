var http = require('http');

function Requester() {

}


Requester.prototype.fetch = function (webUrl) {
  var page;

  var options = {
    host: webUrl,
    port: 80,
    path: '/'
  };

  http.get(options, function(resp){
    resp.setEncoding('utf8');
    resp.on('data', function(chunk){
      return page += chunk;
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });

  return page;

};


module.exports = Requester;
