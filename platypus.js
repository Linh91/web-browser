const Browser = require('./src/Browser.js');

function platypus() {
  const pic = "                           _.-^~~^^^`~-,_,,~''''''```~,''``~'``~, \n\
                   ______,'  -o  :.  _    .          ;     ,'`,  `. \n\
                  (      -\.._,.;;'._ ,(   }        _`_-_,,    `, `, \n\
                   ``~~~~~~'   ((/'((((____/~~~~~~'(,(,___>      `~'"

  const title =  "                    _____    _           _                                 \n\
                    |  __ \\  | |         | |                                \n\
                    | |__) | | |   __ _  | |_   _   _   _ __    _   _   ___ \n\
                    |  ___/  | |  / _` | | __| | | | | | '_ \\  | | | | / __|\n\
                    | |      | | | (_| | | |_  | |_| | | |_) | | |_| | \\__ \\ \n\
                    |_|      |_|  \\__,_|  \\__|  \\__, | | .__/   \\__,_| |___/\n\
                                                 __/ | | |                  \n\
                                                |___/  |_|                  "

  var browser = new Browser();

  console.log('\n', pic, '\n', title)

  var readline = require('readline');

  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt('Please enter a url: \n')
  rl.prompt();

  rl.question("Please enter url: \n", function(webUrl) {
    browser.visitPage(webUrl);
    rl.on('line', function(webUrl) {
      browser.visitPage(webUrl);
    })
  });
};

platypus()
