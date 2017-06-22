const Browser = require('../src/Browser.js');

describe('Browser', function() {
  var browser = new Browser();

  it('navigates to a webpage requested by the user', function(done) {
    webUrl = 'web-browser-test.herokuapp.com';
    console.log(1)
    jasmine.clock().install()
    jasmine.Clock.tick(10)
    browser.visitPage(webUrl)
    originalLog = console.log;
    console.log = jasmine.createSpy('log');
      originalLog(3)
      expect(console.log).toHaveBeenCalledWith('Hello world!');
      originalLog(4)
      expect(console.log).toHaveBeenCalledWith('We are building a web browser!');
      expect(console.log).toHaveBeenCalledWith('Platypus');
      expect(console.log).toHaveBeenCalledWith('Header');
      originalLog(5)
      console.log = originalLog;
      value = 0;
      done();
    // }, 1000000000000000000000);
    console.log(6)
      // done();
    // });
  });
});
