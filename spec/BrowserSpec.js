const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser, parsedHtml, webUrl;

  it("Using a Promise that resolves successfully!", function(done) {
    browser = new Browser();
    webUrl = 'web-browser-test.herokuapp.com';
    browser.visitPage(webUrl, function(content) {
      expect(['Header',
              'Hello world!',
              'We are building a web browser!',
              'Platypus']).toContain(content);
      done();
    });
  });
});
