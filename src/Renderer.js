function Renderer(){
}

Renderer.prototype.printContent = function (parsedHtml, fn) {
  for ( var i = 0; i < parsedHtml.length; i++ ) {
    if (Array.isArray(parsedHtml[i])) {
      this.printContent(parsedHtml[i], fn);
    } else if ( parsedHtml[i][0] !== '<' &&
                /<[^>]*script\s*?/igm.test(parsedHtml[i - 1]) !== true &&
                /<[^>]*script\s*?/igm.test(parsedHtml[i + 1]) !== true &&
                /<[^>]*style\s*?/igm.test(parsedHtml[i - 1]) !== true ) {
      fn(this.convertHtmlChars(parsedHtml[i]), parsedHtml[i-1]);
    }
  }
};

Renderer.prototype.convertHtmlChars = function (htmlText) {
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
module.exports = Renderer;
