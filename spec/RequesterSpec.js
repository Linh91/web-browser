const Requester = require('../src/Requester.js');

describe('Requester', function() {

  var requester = new Requester();

  it('returns the response html from a site', function() {
    var webUrl = 'web-browser-test.herokuapp.com';
    expect(requester.fetch(webUrl)).toEqual('<html>\n<body>\n<p>Hello world</p>\n</body>\n</html>\n');
  });
});
