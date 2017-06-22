function Parser(htmlString) {
  this.htmlCharacters = htmlString.replace(/[\n\r]/g, '').split('');
}

Parser.prototype._parseNextElement = function() {
  var nextLine = [];
  nextLine.push(this._getOpenTag());
  nextLine.push(this._getContent());
  nextLine.push(this._getCloseTag());
  while (Array.isArray(nextLine[nextLine.length - 1])) {
    nextLine.push(this._getCloseTag());
  }
  return nextLine;
};

Parser.prototype._getCloseTag = function() {
  if (this._openTag()) {
    return this._parseNextElement();
  }
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};
Parser.prototype.parsedHtml = function() {
  return this._parseNextElement();
};

Parser.prototype._getOpenTag = function() {
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._getContent = function() {
  if (this._openTag()) {
    return this._parseNextElement();
  }
  var endIndex = this.htmlCharacters.indexOf('<');
  return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._openTag = function () {
  return this.htmlCharacters[0] === '<' && this.htmlCharacters[1] !== '/';
};

module.exports = Parser;
