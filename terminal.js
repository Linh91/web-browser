var blessed = require('blessed');
const Browser = require('./src/Browser')
const Graphic = require('./graphic')

const graphic = new Graphic();
var browser = new Browser();

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Platypus';

var title = blessed.box({
  left: '0%',
  width: '55%',
  height: '18%',
  content: '{bold}' + '\n' + graphic.title + '{/bold}',
  tags: true,
  style: {
    fg: 'white',
    bg: '#4286f4',
  }
});

var pic = blessed.box({
  left: '50%',
  width: '55%',
  height: '18%',
  content: '{bold}' + '\n' + '\n' + graphic.pic + '{/bold}',
  tags: true,
  style: {
    fg: 'white',
    bg: '#4286f4',
  }
});

var display = blessed.box({
  top: '18%',
  height: '76%',
  content: 'display',
  scrollable: true,
  tags: true,
  mouse: true,
  key: true,
  style: {
    fg: 'white',
  },
  border: {
  type: 'line'
  },
});

var addressBar = blessed.form({
  top: '94%',
  height: '8%',
  width: '30%',
  left: '70%',
  name:'addressbar',
  style: {
    fg: 'white',
  },
  border: {
  type: 'line'
  },
});

var textBox = blessed.textbox({
  parent: addressBar,
  name: 'input',
  inputOnFocus: true,
  mouse: true,
  key: true,
  top: '94%',
  height: '8%',
  width: '70%',
  style: {
    fg: 'white',
    bg: 'red'
  },
});

textBox.on('submit', (text) => {
  browser.visitPage(text, function(content) {
    display.pushLine(content)
  });
  textBox.clearValue();
  screen.render();
})

screen.key('enter', (ch, key) => {
  textBox.focus();
})

// Append our box to the screen.
screen.append(title);
screen.append(pic);
screen.append(display);
screen.append(addressBar);
screen.append(textBox);

screen.key(['escape', 'q', 'C-c', 'e'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();
