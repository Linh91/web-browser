function Parser() {}

Parser.prototype.htmlParser = function() {
  return [["<p>", " text ", "</p>"]];
};

module.exports = Parser;
