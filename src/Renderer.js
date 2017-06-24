function Renderer(){
  this.htmlContent = '';
}

Renderer.prototype.printContent = function (parsedHtml) {
  for ( var i = 0; i < parsedHtml.length; i++ ) {
    if (Array.isArray(parsedHtml[i])) {
      this.printContent(parsedHtml[i]);
    } else if ( parsedHtml[i][0] !== '<' &&
                /<[^>]*script\s*?/igm.test(parsedHtml[i - 1]) !== true &&
                /<[^>]*script\s*?/igm.test(parsedHtml[i + 1]) !== true &&
                /<[^>]*style\s*?/igm.test(parsedHtml[i - 1]) !== true ) {
      console.log(parsedHtml[i]);
    }
  }
};

module.exports = Renderer;
