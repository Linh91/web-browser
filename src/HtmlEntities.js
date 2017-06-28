function HtmlEntities() {
  this.htmlAndUnicode = {'&#x21;' : '!', '&#x22;': '\"', '&#x23;': '#', '&#x24;': '$',
                         '&#x26;': '&','&#x27;': "'",'&#x28;': '(','&#x29;': ')',
                         '&copy;': '©','&amp;': '&'}
};

HtmlEntities.prototype.decoder = function (htmlText) {
  for (var i = 0; i < Object.keys(this.htmlAndUnicode).length; i++) {
    var nextHtmlCodeToCheck = new RegExp(Object.keys(this.htmlAndUnicode)[i], 'g');
    htmlText = htmlText.replace(nextHtmlCodeToCheck, Object.values(this.htmlAndUnicode)[i]);
  };
  return htmlText;
};

module.exports = HtmlEntities;
