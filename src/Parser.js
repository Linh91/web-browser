function Parser() {}

Parser.prototype.parseHtml = function (response) {
  this.response = response;
  this._chopPreBody();
  this.htmlCharacters = this._cleanHtml();

  return this._parse();
};

Parser.prototype._chopPreBody = function () {
  var bodyRegex = /<\s*?body\s*?>/igm, bodyTag = bodyRegex.exec(this.response);

  if (bodyTag) {
    this.response = this.response.substring(bodyTag.index);
  }
};

Parser.prototype._cleanHtml = function () {
  this.response = this.response.replace(/[\n\r]/g, '');
  this.response = this.response.split(/>[\s]*</g);
  this.response = this.response.join('><');

  return this.response.split('');
};

Parser.prototype._parse = function () {
  var parsedHtmlArray = [];
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

Parser.prototype._closeTag = function () {
  var endIndex = this.htmlCharacters.indexOf('>');
  if (this._isOpenTag()) {

    return this._parse();
  }

  return this.htmlCharacters.splice(0, endIndex + 1).join('');
};

Parser.prototype._innerContent = function () {
  var endIndex = this.htmlCharacters.indexOf('<');
  if (this._isOpenTag()) {

    return this._parse();
  }

  return this.htmlCharacters.splice(0, endIndex).join('');
};

Parser.prototype._isOpenTag = function () {
  var currentElement, htmlString;

  htmlString = this.htmlCharacters.join('');
  htmlString = htmlString.split('>');
  htmlString = htmlString.join('>\n');
  currentElement = htmlString.split('\n')[0];

  return (/^<[a-z].*>/i).test(currentElement);
};

module.exports = Parser;
