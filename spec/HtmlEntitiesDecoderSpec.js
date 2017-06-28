const HtmlEntitiesDecoder = require('../src/HtmlEntitiesDecoder.js');

describe('HtmlEntitiesDecoder', function() {
  var decoder = new HtmlEntitiesDecoder();

  it('returns a string without html special characters', function() {
    string = "More Britons &#x27;back tax and spend&#x27;"
    expect(decoder.convertHtmlChars(string)).toEqual("More Britons 'back tax and spend'")
  })
})
