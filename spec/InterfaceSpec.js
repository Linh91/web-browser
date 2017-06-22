const Interface = require('../src/Interface.js');

describe('Interface', function() {
  var platerface;

  it("logs logo and image", function() {
    platerface = new Interface();
    originalLog = console.log;
    console.log = jasmine.createSpy('log');
    platerface.welcome();
    expect(console.log).toHaveBeenCalledWith(platerface.pic, '\n', platerface.title);
    console.log = originalLog;
  });

  it("passes user input as an argument to Browser's visitPage function", function() {

  });
});

// interface = new Interface()
// interface.welcome()
// interface.browse()
