function Parser() {
  this.response;
}

Parser.prototype.parseHtml = function (response) {
  this.response = response;
  this._chopPreBody();
  this.htmlCharacters = this._cleanHtml();
  return this._parseNextElement();
};

Parser.prototype._chopPreBody = function () {
  var bodyRegex, bodyTag;

  bodyRegex = /<\s*?body\s*?>/igm;
  bodyTag = bodyRegex.exec(this.response);
  if (bodyTag) {
    this.response = this.response.substring(bodyTag.index);
  }
};

// removes \n charachters, cleans tabs and returns the array of characters
Parser.prototype._cleanHtml = function () {
  this.response = this.response.replace(/[\n\r]/g, '');
  this.response = this.response.split(/>[\s]*</g).join('><');
  return this.response.split('');
};

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


Parser.prototype._getOpenTag = function () {
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
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



module.exports = Parser;
