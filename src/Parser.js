function Parser(htmlString) {
  this.htmlCharacters = htmlString.split('');
}

Parser.prototype.htmlParser = function() {
  var parsedHTML = [], openTag, htmlContent, closeTag, tagArray;
  openTag = this._getTag();
  htmlContent = this._getContent();
  closeTag = this._getTag();
  tagArray = [openTag, htmlContent, closeTag];
  parsedHTML.push(tagArray);
  return parsedHTML;
};

Parser.prototype._getTag = function () {
    var endIndex = this.htmlCharacters.indexOf('>');
    return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._getContent = function () {
    var endIndex = this.htmlCharacters.indexOf('<');
    return this.htmlCharacters.splice(0, endIndex).join('');
};

module.exports = Parser;
