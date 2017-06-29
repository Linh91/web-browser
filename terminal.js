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

var display = blessed.box({
  top: '7%',
  height: '94%',
  width: '82%',
  scrollable: true,
  tags: true,
  mouse: true,
  key: true,
  content: '{bold}' + '\n' + graphic.title + '{/bold}'+'{bold}' + '\n' + '\n' + graphic.pic + '{/bold}',
  border: {
    type: 'line',
  },
  style: {
    fg: 'black',
  }
});

var linksBox = blessed.box({
  content: 'Links:',
  top: '7%',
  height: '94%',
  width: '18%',
  left: '82%',
  scrollable: true,
  tags: true,
  mouse: true,
  key: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'black',
  }
});

var addressBar = blessed.textbox({
  parent: addressBar,
  name: 'input',
  inputOnFocus: true,
  mouse: true,
  key: true,
  height: '7%',
  border: {
    type: 'line',
  },
  style: {
    fg: 'black',
  }
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

screen.append(linksBox);
screen.append(display);
screen.append(addressBar);

screen.key(['escape'], function(ch, key) {
  return process.exit(0);
});

screen.render();
