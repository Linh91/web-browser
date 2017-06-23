const Requester = require('../src/Requester.js');

describe('Requester', function() {
  var requester, webUrl;

  it('returns really big pages which we presume arrive in several chunks', function(done) {
      requester = new Requester();
      webUrl = 'www.bbc.co.uk';
      requester.fetcher(webUrl, function(source) {
      expect(source.length).not.toBeLessThan(200000);
      done();
    });
  });

  it('returns really big pages which we presume arrive in several chunks', function(done) {
    requester = new Requester();
    webUrl = 'web-browser-test.herokuapp.com';
    requester.fetcher(webUrl, function(source) {
    expect(source).toEqual('<html>\n' +
                           '<body>\n' +
                           '<p>Hello world!</p>\n' +
                           '<p>We are building a web browser!</p>\n' +
                           '<p>Platypus</p>\n' +
                           '</body>\n' +
                           '<h1>Header</h1>\n' +
                           '</html>\n');
    done();
    });
  });
});
