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
      fn(parsedHtml[i], parsedHtml[i-1]);
    }
  }
};

Renderer.prototype.convertHtmlChars = function (htmlText) {
  return htmlText
    .replace("&#x21;", "!")
    .replace("&#x22;", "\"")
    .replace("&#x23;", "#")
    .replace("&#x24;", "$")
    .replace("&#x25;", "%")
    .replace("&#x26;", "&")
    .replace("&#x27;", "'")
    .replace("&#x28;", "(")
    .replace("&#x29;", ")")
};
module.exports = Renderer;
