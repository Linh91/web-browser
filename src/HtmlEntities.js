function HtmlEntities() { 
}

HtmlEntities.prototype.decoder = function (htmlText) {
  var nextHtmlCodeToCheck;
  for (var i = 0; i < Object.keys(this.htmlAndUnicode).length; i++) {
    nextHtmlCodeToCheck = new RegExp(Object.keys(this.htmlAndUnicode)[i], 'g');
    htmlText = htmlText.replace(nextHtmlCodeToCheck, Object.values(this.htmlAndUnicode)[i]);
  }
  return htmlText;
};

HtmlEntities.prototype.htmlAndUnicode = {
                         '&#x21;': '!',
                         '&#x22;': '\"',
                         '&#x23;': '#',
                         '&#x24;': '$',
                         '&#x26;': '&',
                         '&#x27;': "'",
                         '&#x28;': '(',
                         '&#x29;': ')',
                         '&amp;': '&',
                         '&copy;': '©'
                        }

module.exports = HtmlEntities;
