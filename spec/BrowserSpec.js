const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser, originalLog, parsedHtml, webUrl;

  beforeEach(function() {
    renderer = new Browser();
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
  });

  afterEach(function() {
    console.log = originalLog;
  });

  fit("Using a Promise that resolves successfully!", function(done) {
    browser = new Browser();
    webUrl = 'web-browser-test.herokuapp.com';
    result = '';
    browser.visitPage(webUrl, function(content) {
      console.log(content)
      expect(console.log).toHaveBeenCalledWith('Header');
      // expect(result).toEqual('Header');
      // done();
    });
  });
});
