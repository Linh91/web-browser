const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser, webUrl;

  it("Using a Promise that resolves successfully!", function(done) {
    browser = new Browser();
    webUrl = 'web-browser-test.herokuapp.com';
    browser.visitPage(webUrl, function(content) {
      expect(content).toContain('Hello world!');
      done();
    });
  });
});
