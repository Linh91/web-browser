const Requester = require('../src/Requester.js');

describe('Requester', function() {
  var requester, webUrl;

  // it('returns the response html from a site', function(done) {
  //   requester = new Requester();
  //   webUrl = 'web-browser-test.herokuapp.com';
  //   requester.fetcher(webUrl, function(source) {
  //     expect(source).toEqual('<html>\n<body>\n<div>\n<h1>Platypus</h1>\n<p>Browser of the year 2017</p>\n</div>\n<p>We are amazing</p>\n</body>\n</html>\n');
  //     done();
  //   })
  // });

  it('returns really big pages which we presume arrive in several chunks', function(done) {
    requester = new Requester();
    webUrl = 'www.bbc.co.uk';
    requester.fetcher(webUrl, function(source) {
      expect(source.length).not.toBeLessThan(200000);
      done();
    })
  })
});
