const Requester = require('../src/Requester.js');

describe('Requester', function() {
  var requester, webUrl;

  beforeEach(function() {
    requester = new Requester();
  });

  it('returns really big pages which we presume arrive in several chunks', function(done) {
      webUrl = 'www.bbc.co.uk';
      requester.fetcher(webUrl, function(source) {
        expect(source.length).not.toBeLessThan(200000);
        done();
      });
  });

  it('returns really big pages which we presume arrive in several chunks', function(done) {
    webUrl = 'web-browser-test.herokuapp.com';
    requester.fetcher(webUrl, function(source) {
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
  });

  it('makes requests to different paths', function(done) {
      webUrl = 'www.bbc.co.uk/news';
      requester.fetcher(webUrl, function(source) {
        expect(source).toContain('Scotland', 'N. Ireland', 'Business');
        done();
      });
  });

  it('makes requests to different paths', function(done) {
      webUrl = 'web-browser-test.herokuapp.com/testpath';
      requester.fetcher(webUrl, function(source) {
        expect(source).toContain("The platypus is among nature's most unlikely animals.");
        done();
      });
  });
});
