function Parser(htmlString) {
  this.htmlCharacters = htmlString.replace(/[\n\r]/g, '').split('');
}

Parser.prototype.parsedHtml = function() {
  return this._parseNextElement();
};

Parser.prototype._getTag = function() {
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._getContent = function() {
  if (this.htmlCharacters[0] === '<') {
    return this._parseNextElement();
  }
  var endIndex = this.htmlCharacters.indexOf('<');
  return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._parseNextElement = function() {
  var openTag, htmlContent, closeTag;
  openTag = this._getTag();
  htmlContent = this._getContent();
  closeTag = this._getTag();
  return [openTag, htmlContent, closeTag];
};

module.exports = Parser;
