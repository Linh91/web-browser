function Parser() {}

Parser.prototype.parseHtml = function (htmlString) {
  this.htmlString = htmlString;
  this._chopPreBody();
  this.htmlCharacters = this._cleanHtml();
  return this._parse();
};

Parser.prototype._chopPreBody = function () {
  var bodyRegex = /<\s*?body\s*?>/igm;
  var bodyTag = bodyRegex.exec(this.htmlString);
  if(bodyTag !== null) {
    this.htmlString = this.htmlString.substring(bodyTag.index);
  }
};

Parser.prototype._cleanHtml = function () {
  this.htmlString = this.htmlString.replace(/[\n\r]/g, '');
  this.htmlString = this.htmlString.split(/>[\s]*</g).join('><');
  return this.htmlString.split('');
};

Parser.prototype._parse = function () {
  var nextLine = [];
  nextLine.push(this._openTag());
  nextLine.push(this._innerContent());
  nextLine.push(this._getCloseTag());
  while (Array.isArray(nextLine[nextLine.length - 1])) {
    nextLine.push(this._getCloseTag());
  }
  return nextLine;
};

Parser.prototype._openTag = function () {
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._innerContent = function () {
  if (this._isOpenTag()) {
    return this._parse();
  }
  var endIndex = this.htmlCharacters.indexOf('<');
  return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._getCloseTag = function () {
  if (this._isOpenTag()) {
    return this._parse();
  }
  var endIndex = this.htmlCharacters.indexOf('>');
  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._isOpenTag = function () {
  return this.htmlCharacters[0] === '<' && this.htmlCharacters[1] !== '/';
};

module.exports = Parser;
