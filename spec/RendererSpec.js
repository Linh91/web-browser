const Renderer = require('../src/Renderer.js')

describe('Renderer', function() {
  var originalLog, parsedHtml, renderer;

  it('console logs all text not in tags', function() {
    renderer = new Renderer();
    parsedHtml = ['<body>', ['<p>', 'Hello world!', '</p>'], '</body>'];
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
    console.log = originalLog;
  });

  it('console logs all text not in tags', function() {
    renderer = new Renderer();
    parsedHtml = [['<body>',
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'],
                 [ '<h1>', 'Header', '</h1>' ]];
    originalLog = console.log;
    console.log = jasmine.createSpy("log");
    renderer.printContent(parsedHtml);
    expect(console.log).toHaveBeenCalledWith("Hello world!");
    expect(console.log).toHaveBeenCalledWith("We are building a web browser!");
    expect(console.log).toHaveBeenCalledWith("Platypus");
    expect(console.log).toHaveBeenCalledWith("Header");
    console.log = originalLog;
  });

  it('ignores script tags', function() {
    renderer = new Renderer();
    parsedHtml = ['<body>',
                 [ '<h1>', 'Header', '</h1>' ],
                 ['<script type="button">', 'Some script text', '</script>'],
                 ['<p>', 'Hello world!', '</p>'],
                 ['<p>', 'We are building a web browser!', '</p>'],
                 [ '<p>', 'Platypus', '</p>' ], '</body>'];
    renderer.printContent(parsedHtml)
    console.log(renderer.printContent(parsedHtml));
  });
});
