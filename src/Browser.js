const Requester = require('./Requester.js');
const Parser = require('./Parser.js');
const Renderer = require('./Renderer.js');

function Browser() {
  this.requester = new Requester();
}

Browser.prototype.visitPage = function(userInput, fn) {
   this.requester.getRequest(userInput, function(response) {
    var parser = new Parser(response);
    var renderer = new Renderer();
    renderer.printContent(parser.parsedHtml(), fn);
  });
};

module.exports = Browser;
