const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var originalLog, parsedHtml, result, renderer, tag;

  beforeEach(function() {
    renderer = new Renderer();
    result = '';
  });

  it('returns all text not in tags', function() {
    parsedHtml = ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'];    
    renderer.printContent(parsedHtml, function(content) {
      expect(content).toEqual("Hello world!");
    });
  });

  it('returns all text from multidimensional arrays', function() {
    parsedHtml = [['<body>',
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'],
                 [ '<h1>', 'Header', '</h1>' ]];
    renderer.printContent(parsedHtml, function(content) {
      result += content;
    });
    expect(result).toEqual('Hello world!We are building a web browser!PlatypusHeader');
  });

  it('ignores script tags', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">', 'Some script text', '</script>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml, function(content) {
      result += content;
    });
    expect(result).toEqual('HeaderHello world!We are building a web browser!Platypus');
  });

  it('ignores style tags', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<style type="button">', 'Style tags', '</style>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml, function(content) {
      result += content;
    });
    expect(result).toEqual('HeaderHello world!We are building a web browser!Platypus');
  });

  it('ignores script tags with other tags inbetween', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">',
                 ['<br>', 'Some script text', '</script>']],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml, function(content) {
      result += content;
    });
    expect(result).toEqual('HeaderHello world!We are building a web browser!Platypus');
  });

  it('converts special characters into unicode characters', function() {
    parsedHtml = ['<body>',
                 ['<p>', 'Hello world&#x21;', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'],
    renderer.printContent(parsedHtml, function(content) {
      result += content;
    });
    expect(result).toEqual('Hello world!Platypus');
  });

  it('associates link tags with content deeply nested inside them', function() {
    parsedHtml = ['<a href="xyz">', ['<span>', 'some text', '</span>'], '</a>'];
    renderer.printContent(parsedHtml, function(content, tag) {
      result = content + tag;
    });
    expect(result).toEqual('some text<a href="xyz">');
  });
});
