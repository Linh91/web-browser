const Parser = require('../src/Parser.js')

describe('Parser', function() {
  var htmlString, parser;


  it('returns array from html string', function() {
    htmlString = "<p> text </p>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual(jasmine.any(Array));
  });

  it('returns an array with compenents of p tag', function() {
    htmlString = "<p> text </p>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual([["<p>", " text ", "</p>"]]);
  });

  it('returns an array with compenents of h1 tag', function() {
    htmlString = "<h1> header </h1>";
    parser = new Parser(htmlString);
    expect(parser.htmlParser()).toEqual([["<h1>", " header ", "</h1>"]]);
  });
});
