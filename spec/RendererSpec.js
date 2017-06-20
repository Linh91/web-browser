const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var renderer = new Renderer();

  it('console logs all text not in tags', function() {
    var parsedHtml = ['<html>', ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'], '</html>'];
    console.log = jasmine.createSpy("log");
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
  });
});
