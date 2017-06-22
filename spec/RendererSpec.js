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

  it('console logs all text not in tags', function() {
    renderer = new Renderer();
    parsedHtml = ['<html>', ['<body>',
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'],
                 [ '<h1>', 'Header', '</h1>' ], '</html>'];
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
    expect(console.log).toHaveBeenCalledWith("We are building a web browser!");
    expect(console.log).toHaveBeenCalledWith("Platypus");
    expect(console.log).toHaveBeenCalledWith("Header");
    console.log = originalLog;
  });

});
