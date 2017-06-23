const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser = new Browser();

  it("Using a Promise that resolves successfully!", function(done) {
    webUrl = 'web-browser-test.herokuapp.com';
    originalLog = console.log;
    console.log = jasmine.createSpy('log');
    browser.visitPage(webUrl, function() {
      expect(console.log).toHaveBeenCalledWith('Hello world!');
      expect(console.log).toHaveBeenCalledWith('We are building a web browser!');
      expect(console.log).toHaveBeenCalledWith('Platypus');
      expect(console.log).toHaveBeenCalledWith('Header');
      console.log = originalLog;
      done();
    });
  });
});
