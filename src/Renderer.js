const HtmlEntities = require('./HtmlEntities.js');

function Renderer(){
  this.hyperlinkTag = false;
  this.htmlEntities = new HtmlEntities();
}

Renderer.prototype.printContent = function (parsedHtml, fn) {
  for ( var i = 0; i < parsedHtml.length; i++ ) {
    if (Array.isArray(parsedHtml[i])) {
      this.printContent(parsedHtml[i], fn);
    } else if ( this._isHyperlinkTag(parsedHtml[i])) {
      this.hyperlinkTag = parsedHtml[i];
    } else if ( this._rendererReq(parsedHtml[i], parsedHtml[i-1], parsedHtml[i+1])) {
      this._render(parsedHtml[i], parsedHtml[i-1], fn);
    }
  }
};

Renderer.prototype._render = function (content, htmlTag, fn) {
  content = this.htmlEntities.decoder(content);
  htmlTag = (this.hyperlinkTag) ? this.hyperlinkTag : htmlTag;
    fn(content, htmlTag);
    this.hyperlinkTag = false;
};

Renderer.prototype._rendererReq = function (el, previousEl, nextEl) {
  return this._isNotTag(el[0]) &&
         this._isNotScriptTag(previousEl) &&
         this._isNotScriptTag(nextEl) &&
         this._isNotStyleTag(previousEl);
};

Renderer.prototype._isNotScriptTag = function (text) {
  return !/<[^>]*script\s*?/igm.test(text);
};

Renderer.prototype._isNotStyleTag = function (text) {
  return !/<[^>]*style\s*?/igm.test(text);
};

Renderer.prototype._isHyperlinkTag = function (text) {
  return /<[^>]*a* href\s*?/igm.test(text);
};

Renderer.prototype._isNotTag = function (text) {
  return text !== '<';
};

module.exports = Renderer;
