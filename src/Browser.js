const Requester = require('./Requester.js');
const Parser = require('./Parser.js');
const Renderer = require('./Renderer.js');

function Browser() {
  this.requester = new Requester();
}

Browser.prototype.visitPage = function(userInput, fn) {
   this.requester.getRequest(userInput, function(response) {
    if (response.includes('The document has moved')) {
      var browser;
      browser = new Browser();
      browser._redirect(response, fn);
    } else {
      var parser = new Parser(response);
      var renderer = new Renderer();
      renderer.printContent(parser.parsedHtml(), fn);
    }
  });
};

Browser.prototype._redirect = function(response, fn) {
  var urlStart, urlEnd, redirectedUrl;
  urlStart = response.indexOf('://') + 3;
  urlEnd = response.indexOf('">', urlStart);
  redirectedUrl = response.slice(urlStart, urlEnd);
  return this.visitPage(redirectedUrl, fn);
};

module.exports = Browser;
