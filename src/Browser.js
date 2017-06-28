const Requester = require('./Requester.js');
const Parser = require('./Parser.js');
const Renderer = require('./Renderer.js');

function Browser() {
  this.requester = new Requester();
}

Browser.prototype.visitPage = function(webUrl, fn) {
   this.requester.fetcher(webUrl, function(source) {
    var parser = new Parser();
    var renderer = new Renderer();
    renderer.printContent(parser.parseHtml(source), fn);
  });
};

module.exports = Browser;
