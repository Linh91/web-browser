const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser = new Browser();

  it('navigates to a webpage requested by the user', function(done) {
    webUrl = 'web-browser-test.herokuapp.com';
    console.log = jasmine.createSpy('log');
    browser.visitPage(webUrl)
    done();
    expect(console.log).toHaveBeenCalledWith('Hello World')
  });
});
