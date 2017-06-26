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
  width: '80%',
  scrollable: true,
  tags: true,
  mouse: true,
  key: true,
  style: {
    fg: 'black',
  },
  border: {
    type: 'line'
  },
});

var linksBox = blessed.box({
  content: 'Links:',
  top: '18%',
  height: '76%',
  width: '20%',
  left: '80%',
  scrollable: true,
  tags: true,
  mouse: true,
  key: true,
  style: {
    fg: 'black',
  },
  border: {
    type: 'line'
  },
});

var addressBar = blessed.textbox({
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

var links = []

var navigate = function(text) {
  display.setContent('');
  linksBox.setContent('');
  var linkCounter = 0
  browser.visitPage(text, function(content, tag) {
    if (/<[^>]*a href\s*?/igm.test(tag)) {
      linksBox.pushLine((linkCounter + 1 + ' ') + content);
      links.push(tag);
      linkCounter += 1;
    }
    display.pushLine(content);
    screen.render();
  });
  addressBar.focus();
  addressBar.clearValue();
}

addressBar.on('submit', (text) => {

  if(Number.isInteger(parseInt(text[0]))) {
    var linkNum = parseInt(text[0]) - 1;
    var openUrl = links[linkNum].indexOf('://') + 3
    var cleanedLink = links[linkNum].slice(openUrl, links[linkNum].length - 2)
    
    text = cleanedLink
    navigate(text)
  } else {
    navigate(text)
  }
})

// Append our box to the screen.
screen.append(title);
screen.append(pic);
screen.append(linksBox);
screen.append(display);
screen.append(addressBar);

screen.key(['escape'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();
