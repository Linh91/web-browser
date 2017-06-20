const Parser = require('../src/Parser.js')

describe('Parser', function() {
  var htmlString, parser;


  it('returns array from html string', function() {
    htmlString = "<p> text </p>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual(jasmine.any(Array));
  });

  it('returns an array with components of p tag', function() {
    htmlString = "<p> text </p>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual([["<p>", " text ", "</p>"]]);
  });

  it('returns an array with components of h1 tag', function() {
    htmlString = "<h1> header </h1>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual([["<h1>", " header ", "</h1>"]]);
  });

  it('returns an array of p tags when h1 tag nested inside', function() {
    htmlString = "<p><h1> header </h1></p>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual([["<p>", ["<h1>", " header ", "</h1>"], "</p>"]]);
  });
});
