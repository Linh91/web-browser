const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var originalLog, parsedHtml, renderer;

  it('console logs all text not in tags', function() {
    renderer = new Renderer();
    parsedHtml = ['<html>', ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'], '</html>'];
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
    console.log = originalLog;
  });
});
