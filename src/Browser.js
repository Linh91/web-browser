const Requester = require('./Requester.js');
const Parser = require('./Parser.js');
const Renderer = require('./Renderer.js');

function Browser() {
  this.requester = new Requester();
}

Browser.prototype.visitPage = function(webUrl, fn) {
   this.requester.fetcher(webUrl, function(source) {
    if (source.includes('The document has moved')) {
      var browser, urlStart, urlEnd, redirectedUrl;
      browser = new Browser();
      browser._redirect(source, fn);
    } else {
      var parser = new Parser();
      var renderer = new Renderer();
      renderer.printContent(parser.parseHtml(source), fn);
    }
  });
};

Browser.prototype._redirect = function(response, fn) {
  urlStart = response.indexOf('://') + 3;
  urlEnd = response.indexOf('">', urlStart);
  redirectedUrl = response.slice(urlStart, urlEnd);
  return this.visitPage(redirectedUrl, fn);
};

module.exports = Browser;
