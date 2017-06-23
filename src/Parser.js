function Parser(htmlString) {
  this.htmlString = htmlString;
  this._chopPreBody();
  this.htmlCharacters = this._cleanHtml();
}

// Controls the parsing, recursive, and can handle multiple childs in a line with the
// while loop, which is looping till finds a close tag for the line

Parser.prototype._parseNextElement = function () {
  var nextLine = [];
  nextLine.push(this._getOpenTag());
  nextLine.push(this._getContent());
  nextLine.push(this._getCloseTag());
  while (Array.isArray(nextLine[nextLine.length - 1])) {
    nextLine.push(this._getCloseTag());
  }
  return nextLine;
};

//looking for a close tag, but if it finds an opentag, it starts a new line

Parser.prototype._getCloseTag = function () {
  if (this._openTag()) {
    return this._parseNextElement();
  }
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype.parsedHtml = function () {
  return this._parseNextElement();
};

Parser.prototype._getOpenTag = function () {
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._chopPreBody = function () {
  var bodyRegex = /<\s*?body\s*?>/igm;
  var bodyTag = bodyRegex.exec(this.htmlString);
  if(bodyTag !== null) {
    this.htmlString = this.htmlString.substring(bodyTag.index);
  }
};

//looking for content, but if it finds an opentag, it starts a new line

Parser.prototype._getContent = function () {
  if (this._openTag()) {
    return this._parseNextElement();
  }
  var endIndex = this.htmlCharacters.indexOf('<');
  return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._openTag = function () {
  return this.htmlCharacters[0] === '<' && this.htmlCharacters[1] !== '/';
};

// removes \n charachters, cleans tabs and returns the array of characters

Parser.prototype._cleanHtml = function () {
  this.htmlString = this.htmlString.replace(/[\n\r]/g, '');
  this.htmlString = this.htmlString.split(/>[\s]*</g).join('><');
  return this.htmlString.split('');
};

module.exports = Parser;
