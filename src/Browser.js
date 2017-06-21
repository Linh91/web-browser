const Requester = require('./Requester.js');
const Parser = require('./Parser.js');
const Renderer = require('./Renderer.js');

function Browser() {
  this.requester = new Requester();
};

Browser.prototype.visitPage = function(webUrl) {
   this.requester.fetcher(webUrl, function(source) {
    var parser = new Parser(source)
    var renderer = new Renderer();
    renderer.printContent(parser.parsedHtml());
  });
};

module.exports = Browser;
