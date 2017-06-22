const Interface = require('../src/Interface.js');

describe('Interface', function() {
  it("logs logo and image", function() {
    var interface = new Interface();
    originalLog = console.log;
    console.log = jasmine.createSpy('log');
    interface.welcome()
    expect(console.log).toHaveBeenCalled()
    console.log = originalLog;
  });

  it("passes user input as an argument to Browser's visitPage function", function() {

  });
});

interface = new Interface()
interface.welcome()
interface.browse()
