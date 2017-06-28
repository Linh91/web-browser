function Parser() {}

Parser.prototype.parseHtml = function (response) {
  this.response = response;
  this._chopPreBody();
  this.htmlCharacters = this._cleanHtml();
  return this._parse();
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
  this.response = this.response.split(/>[\s]*</g);
  this.response = this.response.join('><');
  return this.response.split('');
};

// Controls the parsing, recursive, and can handle multiple childs in a line with the
// while loop, which is looping till finds a close tag for the line

Parser.prototype._parse = function () {
  var parsedHtmlArray;

  parsedHtmlArray = [];
  parsedHtmlArray.push(this._openTag());
  parsedHtmlArray.push(this._innerContent());
  parsedHtmlArray.push(this._closeTag());
  while (Array.isArray(parsedHtmlArray[parsedHtmlArray.length - 1])) {
    parsedHtmlArray.push(this._closeTag());
  }
  return parsedHtmlArray;
};

Parser.prototype._openTag = function () {
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

//looking for a close tag, but if it finds an opentag, it starts a new line

Parser.prototype._closeTag = function () {
  if (this._isOpenTag()) {
    return this._parse();
  }
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

//looking for content, but if it finds an opentag, it starts a new line

Parser.prototype._innerContent = function () {
  if (this._isOpenTag()) {
    return this._parse();
  }
  var endIndex = this.htmlCharacters.indexOf('<');
  return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._isOpenTag = function () {
  var htmlString;

  htmlString = this.htmlCharacters.join('').split('>').join('>\n').split('\n')[0];
  return /<\s*?\w*\s*?>/igm.test(htmlString);
};

module.exports = Parser;
