const Requester = require('../src/Requester.js');

describe('Requester', function() {
  var requester, userInput;

  beforeEach(function() {
    requester = new Requester();
  });

  it('returns really big pages like the BBC which we presume arrive in several chunks', function(done) {
      userInput = 'www.bbc.co.uk';
      requester.getRequest(userInput, function(source) {
        expect(source.length).not.toBeLessThan(200000);
        done();
      });
  }, 10000);

  it('returns really big pages which we presume arrive in several chunks', function(done) {
    userInput = 'web-browser-test.herokuapp.com';
    requester.getRequest(userInput, function(source) {
    expect(source).toEqual('<html>\n' +
                           '<body>\n' +
                           '<h1>Header</h1>\n' +
                           '<p>Hello world!</p>\n' +
                           '<p>We are building a web browser!</p>\n' +
                           '<p>Platypus</p>\n' +
                           '</body>\n' +
                           '</html>\n');
    done();
    });
  }, 10000);

  it('makes requests to different paths', function(done) {
      userInput = 'www.bbc.co.uk/news';
      requester.getRequest(userInput, function(source) {
        expect(source).toContain('Scotland', 'N. Ireland', 'Business');
        done();
      });
  }, 10000);

  it('makes requests to different paths', function(done) {
      userInput = 'web-browser-test.herokuapp.com/testpath';
      requester.getRequest(userInput, function(source) {
        expect(source).toContain("The platypus is among nature's most unlikely animals.");
        done();
      });
  });
});
