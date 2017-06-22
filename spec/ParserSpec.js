const Parser = require('../src/Parser.js')

describe('Parser', function() {
  var htmlString, parser, result;

  it('returns array from html string', function() {
    htmlString = "<p> text </p>";
    parser = new Parser(htmlString);
    expect(parser.parsedHtml()).toEqual(jasmine.any(Array));
  });

  it('returns an array with components of p tag', function() {
    htmlString = "<p> text </p>";
    parser = new Parser(htmlString);
    expect(parser.parsedHtml()).toEqual(["<p>", " text ", "</p>"]);
  });

  it('returns an array with components of h1 tag', function() {
    htmlString = "<h1> header </h1>";
    parser = new Parser(htmlString);
    expect(parser.parsedHtml()).toEqual(["<h1>", " header ", "</h1>"]);
  });

  it('returns an array of p tags when h1 tag nested inside', function() {
    htmlString = "<p><h1> header </h1></p>";
    parser = new Parser(htmlString);
    expect(parser.parsedHtml()).toEqual(["<p>", ["<h1>", " header ", "</h1>"], "</p>"]);
  });

  it('returns an array of deeply nested tags in the correct format', function() {
    htmlString = "<html><body><p>Hello world!</p></body></html>";
    parser = new Parser(htmlString);
    result = ['<html>', ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'], '</html>'];
    expect(parser.parsedHtml()).toEqual(result);
  });

  it('returns an array of deeply nested multiple child elements in the correct format', function() {
    htmlString = "<html><body><p>Hello world!</p><p>We are building a web browser!</p><p>Platypus</p></body><h1>Header</h1></html>";
    parser = new Parser(htmlString);
    result = ['<html>', ['<body>',
             ['<p>', 'Hello world!', '</p>'],
             ['<p>', 'We are building a web browser!', '</p>'],
             [ '<p>', 'Platypus', '</p>' ], '</body>'],
             [ '<h1>', 'Header', '</h1>' ], '</html>'];
    expect(parser.parsedHtml()).toEqual(result);
  });
});
