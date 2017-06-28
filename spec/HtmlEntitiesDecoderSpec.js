const HtmlEntities = require('../src/HtmlEntities.js');

describe('HtmlEntities', function() {
  var htmlEntities = new HtmlEntities();

  fit('returns a string without html special characters', function() {
    string = "More Britons &#x27;back tax and spend&#x27;";
    expect(htmlEntities.decoder(string)).toEqual("More Britons 'back tax and spend'");
  });
});
