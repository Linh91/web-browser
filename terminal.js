const blessed = require('blessed');
const Browser = require('./src/Browser');
const Graphic = require('./graphic');

const graphic = new Graphic();
const browser = new Browser();
var links, linkCounter, url;


var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Platypus';

var title = blessed.box({
  content: 'Platypus',
  left: '0%',
  width: '100%',
  height: '10%',
  // content: '{bold}' + '\n' + graphic.title + '{/bold}',
  tags: true,
  style: {
    fg: 'white',
    bg: '#68707c',
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
  content: '{bold}' + '\n' + '\n' + graphic.pic + '{/bold}' + '{bold}' + '\n' + graphic.title + '{/bold}',
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
    bg: 'grey'
  },
});


addressBar.on('submit', (text) => {
  if(Number.isInteger(parseInt(text[0]))) {
    var linkNum = parseInt(text) - 1;
    var openUrl = 0
    if (links[linkNum].includes('://')) {
      openUrl = links[linkNum].indexOf('://') + 3;
    }
    var cleanedLink = links[linkNum].slice(openUrl, links[linkNum].length - 2);
    text = cleanedLink;
    navigate(text);
  } else {
    navigate(text);
  }
});

var navigate = function(text) {
  url = text
  clearData()
  browser.visitPage(text, callBack);
  addressBar.clearValue();
  addressBar.focus();
}

var clearData = function() {
  display.setContent('');
  linksBox.setContent('Links:');
  links = [];
  linkCounter = 0
}

var callBack = function(content, tag) {
  if (/<[^>]*a* href\s*?/igm.test(tag)) {
    pushLinkToArray(tag, url);
    linksBox.pushLine((linkCounter + 1 + '. ') + `{blue-fg}{underline}${content}{/}`);
    display.pushLine(`{blue-fg}{underline}${content}{/} (${linkCounter})`);
    screen.render();
    linkCounter += 1;
  } else if (/<\s*h([1-6].*?)>/igm.test(tag)) {
    display.pushLine('{bold}' + content + '{/bold}')
    screen.render();
  } else {
    display.pushLine(content);
    screen.render();
  }
}

var pushLinkToArray = function(tag, url) {
  var startTag = tag.indexOf('href=');
  tag = tag.slice(startTag, tag.length)
  var endTag = tag.indexOf('"', tag.indexOf('"') + 1 )
  tag = tag.slice(0, endTag + 2)
  var startHtml = "<a "
  if (tag.includes('http')) {
    links.push(tag);
  } else {
    var openTagIndex = tag.indexOf('href=') + 6
    if ( url.includes('/')) {
      var baseUrl = url.indexOf('/')
      url = url.slice(0, baseUrl)
    }
    tag = startHtml + tag
    links.push(url + tag.slice(openTagIndex, tag.length))
  };
};

screen.append(title);
// screen.append(pic);
screen.append(linksBox);
screen.append(display);
screen.append(addressBar);

screen.key(['escape'], function(ch, key) {
  return process.exit(0);
});

screen.render();
