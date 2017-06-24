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
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
  });

  it('console logs all text not in tags', function() {
    parsedHtml = [['<body>',
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'],
                 [ '<h1>', 'Header', '</h1>' ]];
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
    expect(console.log).toHaveBeenCalledWith("We are building a web browser!");
    expect(console.log).toHaveBeenCalledWith("Platypus");
    expect(console.log).toHaveBeenCalledWith("Header");
  });

  it('ignores script tags', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">', 'Some script text', '</script>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith('Header');
    expect(console.log).not.toHaveBeenCalledWith('Some script text');
    expect(console.log).toHaveBeenCalledWith('Hello world!');
  });

  it('ignores style tags', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<style type="button">', 'Style tags', '</style>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith('Header');
    expect(console.log).not.toHaveBeenCalledWith('Some script text');
    expect(console.log).toHaveBeenCalledWith('Hello world!');
  });

  it('ignores script tags with other tags inbetween', function() {
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">',
                 ['<br>', 'Some script text', '</script>']],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith('Header');
    expect(console.log).not.toHaveBeenCalledWith('Some script text');
    expect(console.log).toHaveBeenCalledWith('Hello world!');
  });
});
