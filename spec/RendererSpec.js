const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var renderer = new Renderer();

  it('console logs all text not in tags', function() {
    var parsedHtml = ['<html>', ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'], '</html>'];
    expect(renderer.printContent(parsedHtml)).toEqual("Hello world!")
  });
});
