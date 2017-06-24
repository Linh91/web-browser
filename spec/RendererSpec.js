const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var originalLog, parsedHtml, renderer;

  beforeEach(function() {
    renderer = new Renderer();
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
  });

  afterEach(function() {
    console.log = originalLog;
  });

  it('console logs all text not in tags', function() {
    parsedHtml = ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'];
    expect(renderer.printContent(parsedHtml)).toEqual("Hello world!\n");
  });

  it('console logs all text not in tags', function() {
    parsedHtml = [['<body>',
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'],
                 [ '<h1>', 'Header', '</h1>' ]];
    expect(renderer.printContent(parsedHtml)).toEqual('Hello world!\n' +
                                                      'We are building a web browser!\n' +
                                                      'Platypus\nHeader\n');
  });

  it('ignores script tags', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">', 'Some script text', '</script>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    expect(renderer.printContent(parsedHtml)).toEqual('Header\n' +
                                                      'Hello world!\n' +
                                                      'We are building a web browser!\n' +
                                                      'Platypus\n');
  });

  it('ignores style tags', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<style type="button">', 'Style tags', '</style>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    expect(renderer.printContent(parsedHtml)).toEqual('Header\n' +
                                                      'Hello world!\n' +
                                                      'We are building a web browser!\n' +
                                                      'Platypus\n');
  });

  it('ignores script tags with other tags inbetween', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">',
                 ['<br>', 'Some script text', '</script>']],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    expect(renderer.printContent(parsedHtml)).toEqual('Header\n' +
                                                      'Hello world!\n' +
                                                      'We are building a web browser!\n' +
                                                      'Platypus\n');
  });
});
