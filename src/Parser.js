function Parser(htmlString) {
  this.htmlCharacters = htmlString.split('');
}

Parser.prototype.htmlParser = function() {
  var parsedHTML = [];
  parsedHTML.push(this._getLine());
  return parsedHTML;
};

Parser.prototype._getTag = function() {
    var endIndex = this.htmlCharacters.indexOf('>');
    return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._getContent = function() {
    if (this.htmlCharacters[0] === '<') {
      return this._getLine();
    }
    var endIndex = this.htmlCharacters.indexOf('<');
    return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._getLine = function() {
  var openTag, htmlContent, closeTag;
  openTag = this._getTag();
  htmlContent = this._getContent();
  closeTag = this._getTag();
  return [openTag, htmlContent, closeTag];
};

module.exports = Parser;
