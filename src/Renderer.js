function Renderer(){
  this.htmlContent = '';
}

Renderer.prototype.printContent = function (parsedHtml) {
  for ( var i = 0; i < parsedHtml.length; i++ ) {
    if (Array.isArray(parsedHtml[i])) {
      this.printContent(parsedHtml[i]);
    } else if ( parsedHtml[i][0] !== '<' ) {
        console.log(parsedHtml[i]);
    }
  }
};

module.exports = Renderer;
