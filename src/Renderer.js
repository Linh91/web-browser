function Renderer(){

};

Renderer.prototype.printContent = function (parsedHtml) {
  if (Array.isArray(parsedHtml[1])) {
    return this.printContent(parsedHtml[1]);
  } else {
    console.log(parsedHtml[1])
  };
};

module.exports = Renderer;
