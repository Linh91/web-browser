const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var parsedHtml, renderer;

  it('console logs all text not in tags', function() {
    renderer = new Renderer()
    parsedHtml = ['<html>', ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'], '</html>'];
    expect(renderer.printContent(parsedHtml)).toEqual("Hello world!")
  });
});
