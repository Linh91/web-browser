const HtmlEntities = require('./HtmlEntities.js');

function Renderer() {
  this.hyperlinkTag = false;
  this.htmlEntities = new HtmlEntities();
}

Renderer.prototype.printContent = function (parsedHtml, fn) {
  var el, nextEl, previousEl
  for (var i = 0; i < parsedHtml.length; i++) {
    el = parsedHtml[i]
    nextEl = parsedHtml[i + 1]
    previousEl = parsedHtml[i - 1]

    if (Array.isArray(el)) {
      this.printContent(el, fn);
    } else if (this._isHyperlinkTag(el)) {
      this.hyperlinkTag = el;
    } else if (this._rendererReq(el, previousEl, nextEl)) {
      this._render(el, previousEl, fn);
    }
  }
};

Renderer.prototype._render = function (htmlContent, htmlTag, fn) {
  var content, tag;
  content = this.htmlEntities.decoder(htmlContent);
  tag = (this.hyperlinkTag) ? this.hyperlinkTag : htmlTag;
    fn(content, tag);
    this.hyperlinkTag = false;
};

Renderer.prototype._rendererReq = function (el, previousEl, nextEl) {
  return this._isNotTag(el[0]) &&
         this._isNotScriptTag(previousEl) &&
         this._isNotScriptTag(nextEl) &&
         this._isNotStyleTag(previousEl);
};

Renderer.prototype._isNotScriptTag = function (text) {
  return !(/<[^>]*script\s*?/igm).test(text);
};

Renderer.prototype._isNotStyleTag = function (text) {
  return !(/<[^>]*style\s*?/igm).test(text);
};

Renderer.prototype._isHyperlinkTag = function (text) {
  return (/<[^>]*a* href\s*?/igm).test(text);
};

Renderer.prototype._isNotTag = function (text) {
  return text !== '<';
};

module.exports = Renderer;
