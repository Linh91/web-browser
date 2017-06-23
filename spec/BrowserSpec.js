const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser, webUrl;

  beforeEach(function() {
    browser = new Browser();
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
  });

  afterEach(function() {
    console.log = originalLog;
  });

  it("Using a Promise that resolves successfully!", function(done) {
    webUrl = 'web-browser-test.herokuapp.com';
    browser.visitPage(webUrl, function() {
      expect(console.log).toHaveBeenCalledWith('Hello world!');
      expect(console.log).toHaveBeenCalledWith('We are building a web browser!');
      expect(console.log).toHaveBeenCalledWith('Platypus');
      expect(console.log).toHaveBeenCalledWith('Header');
      done();
    });
  });
});
