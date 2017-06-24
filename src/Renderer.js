function Renderer(){
  this.htmlContent = '';
}

Renderer.prototype._printContent = function (parsedHtml) {
  for ( var i = 0; i < parsedHtml.length; i++ ) {
    if (Array.isArray(parsedHtml[i])) {
      this._printContent(parsedHtml[i]);
    } else if ( parsedHtml[i][0] !== '<' && /<[^>]*script\s*?/igm.test(parsedHtml[i - 1]) !== true) {
        // console.log('before')
        // console.log(this.htmlContent)
        this.htmlContent += parsedHtml[i] + '\n';
        // console.log('current line')
        // console.log(parsedHtml[i])
        // console.log('after')
        // console.log(this.htmlContent)
    }
  }
  // console.log('return')
  // return this.htmlContent
};

Renderer.prototype.printContent = function (parsedHtml) {
  this._printContent(parsedHtml);
  return this.htmlContent;
}

module.exports = Renderer;
