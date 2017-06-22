const Interface = require('../src/Interface.js');

describe('Interface', function() {
  var platerface;

  beforeEach(function() {
    platerface = new Interface();
  });

  it("logs logo and image", function() {
    originalLog = console.log;
    console.log = jasmine.createSpy('log');
    platerface.welcome();
    expect(console.log).toHaveBeenCalledWith(platerface.pic, '\n', platerface.title);
    console.log = originalLog;
  });

  it("welcome function invokes browse", function() {
    platerface.browse = jasmine.createSpy('browse');
    platerface.welcome();
    expect(platerface.browse).toHaveBeenCalled();
  });
});
