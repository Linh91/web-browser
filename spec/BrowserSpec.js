const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser = new Browser();

  it('navigates to a webpage requested by the user', function() {
    webUrl = 'web-browser-test.herokuapp.com';
    originalLog = console.log;
    console.log = jasmine.createSpy('log');
    browser.visitPage(webUrl, function(done) {
      expect(console.log).toHaveBeenCalledWith('Hello world!');
      expect(console.log).toHaveBeenCalledWith('We are bulding a web browser!');
      expect(console.log).toHaveBeenCalledWith('Platypus');
      expect(console.log).toHaveBeenCalledWith('Header');
      done();
    });
    console.log = originalLog;
  });
});
