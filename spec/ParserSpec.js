const Parser = require('../src/Parser.js')

describe('Parser', function() {
  var htmlString, parser;

  beforeEach(function() {
    parser = new Parser(htmlString);
    htmlString = "<p> text </p>"
  });

  it('returns array from html string', function() {
    expect(parser.htmlParser()).toEqual(jasmine.any(Array));
  });

  it('returns an array with compenents of p tag', function() {
    expect(parser.htmlParser()).toEqual([["<p>", " text ", "</p>"]]);
  });
});
