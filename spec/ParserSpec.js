const Parser = require('../src/Parser.js')

describe('Parser', function() {
  var response, parser, result;

  it('returns array from html string', function() {
    response = '<p> text </p>';
    parser = new Parser();
    expect(parser.parseHtml(response)).toEqual(jasmine.any(Array));
  });

  it('returns an array with components of p tag', function() {
    response = '<p> text </p>';
    parser = new Parser();
    expect(parser.parseHtml(response)).toEqual(['<p>', ' text ', '</p>']);
  });

  it('returns an array with components of h1 tag', function() {
    response = '<h1> header </h1>';
    parser = new Parser();
    expect(parser.parseHtml(response)).toEqual(['<h1>', ' header ', '</h1>']);
  });

  it('returns an array of p tags when h1 tag nested inside', function() {
    response = '<p><h1> header </h1></p>';
    parser = new Parser();
    expect(parser.parseHtml(response)).toEqual(['<p>', ['<h1>', ' header ', '</h1>'], '</p>']);
  });

  it('recognizes tags with properties', function() {
    response = "<a href='lalala' class='lala'><h1> header </h1></a>";
    parser = new Parser();
    expect(parser.parseHtml(response)).toEqual([ "<a href='lalala' class='lala'>", [ '<h1>', ' header ', '</h1>' ], '</a>' ]);
  });

  it('recognizes tags in upper case', function() {
    response = '<DIV><H1> header </H1></DIV>';
    parser = new Parser();
    expect(parser.parseHtml(response)).toEqual([ '<DIV>', [ '<H1>', ' header ', '</H1>' ], '</DIV>' ]);
  });

  it('recognizes tags nested in content', function() {
    response = "<html><body><p>Hello <a href='bla'>world</a>!</p></body></html>";
    parser = new Parser();
    result = ['<body>', ['<p>', 'Hello ', ["<a href='bla'>", 'world', '</a>'], '!', '</p>'], '</body>'];
    expect(parser.parseHtml(response)).toEqual(result);
  });

  it('recognizes first element as content', function() {
    response = 'covfefe<a href="lala">hello</a><p>hehehe</p>';
    parser = new Parser();
    result = ['covfefe', ['<a href="lala">', 'hello', '</a>'], ['<p>', 'hehehe', '</p>'], ''];
    expect(parser.parseHtml(response)).toEqual(result);
  });

  it('returns an array of deeply nested tags in the correct format', function() {
    response = '<html><body><p>Hello world!</p></body></html>';
    parser = new Parser();
    result = ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'];
    expect(parser.parseHtml(response)).toEqual(result);
  });

  it('returns an array of deeply nested multiple child elements in the correct format', function() {
    response = '<html>\n<body>\n<p>Hello world!</p>\n<p>We are building a web browser!</p>\n<p>Platypus</p>\n</body><h1>Header</h1>\n</html>';
    parser = new Parser();
    result = ['<body>',
             ['<p>', 'Hello world!', '</p>'],
             ['<p>', 'We are building a web browser!', '</p>'],
             [ '<p>', 'Platypus', '</p>' ], '</body>'],
             [ '<h1>', 'Header', '</h1>' ];
    expect(parser.parseHtml(response)).toEqual(result);
  });

  it('removes everything before the opening body tag', function() {
    response = '<!DOCTYPE html>\n<html>\n<head>\n<title>this is the title</title>\n</head>\n<body>\n<p>Web browser</p>\n</body>\n</html>';
    parser = new Parser();
    result = ['<body>',['<p>', 'Web browser', '</p>'], '</body>'];
    expect(parser.parseHtml(response)).toEqual(result);
  });

  it('removes unnecessary tabs', function() {
    response = '  <body>' +
                 '    <div>' +
                 '      <header> Platypus </header>' +
                 "    <p>The platypus is among nature's most unlikely animals.</p>" +
                 '      </div>' +
                 '  </body>';
    parser = new Parser();
    result = ['<body>',['<div>',
             ['<header>', ' Platypus ', '</header>'],
             ['<p>', "The platypus is among nature's most unlikely animals.", '</p>'],
             '</div>'], '</body>'];
    expect(parser.parseHtml(response)).toEqual(result);
  });
});
