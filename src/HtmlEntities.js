function HtmlEntities() {

};

HtmlEntities.prototype.decoder = function (htmlText) {
  return htmlText
  .replace(/&#x21;/g, "!")
  .replace(/&#x22;/g, "\"")
  .replace(/&#x23;/g, "#")
  .replace(/&#x24;/g, "$")
  .replace(/&#x25;/g, "%")
  .replace(/&#x26;/g, "&")
  .replace(/&#x27;/g, "'")
  .replace(/&#x28;/g, "(")
  .replace(/&#x29;/g, ")")
  .replace(/&copy;/g, "©")
  .replace(/&amp;/g, "&")
};

module.exports = HtmlEntities;
