const HtmlEntities = require('./HtmlEntities.js');

function Renderer(){
  this.openATag = false
  this.htmlEntities = new HtmlEntities();
}

Renderer.prototype.printContent = function (parsedHtml, fn) {
  for ( var i = 0; i < parsedHtml.length; i++ ) {
    if (Array.isArray(parsedHtml[i])) {
      this.printContent(parsedHtml[i], fn);
    } else if ( /<[^>]*a* href\s*?/igm.test(parsedHtml[i]) === true &&
    (Array.isArray(parsedHtml[i + 1]))) {
      this.openATag = parsedHtml[i]
    } else if ( parsedHtml[i][0] !== '<' &&
    /<[^>]*script\s*?/igm.test(parsedHtml[i - 1]) !== true &&
    /<[^>]*script\s*?/igm.test(parsedHtml[i + 1]) !== true &&
    /<[^>]*style\s*?/igm.test(parsedHtml[i - 1]) !== true ) {
      if(this.openATag === false) {
        fn(this.htmlEntities.decoder(parsedHtml[i]), parsedHtml[i-1]);
      } else {
        fn(this.htmlEntities.decoder(parsedHtml[i]), this.openATag);
        this.openATag = false
      }
    }
  }
};

module.exports = Renderer;
