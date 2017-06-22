function Interface() {
  this.pic = "                           _.-^~~^^^`~-,_,,~''''''```~,''``~'``~, \n\
                   ______,'  -o  :.  _    .          ;     ,'`,  `. \n\
                  (      -\.._,.;;'._ ,(   }        _`_-_,,    `, `, \n\
                   ``~~~~~~'   ((/'((((____/~~~~~~'(,(,___>      `~'"

  this.title =  "                    _____    _           _                                 \n\
                    |  __ \\  | |         | |                                \n\
                    | |__) | | |   __ _  | |_   _   _   _ __    _   _   ___ \n\
                    |  ___/  | |  / _` | | __| | | | | | '_ \\  | | | | / __|\n\
                    | |      | | | (_| | | |_  | |_| | | |_) | | |_| | \\__ \\ \n\
                    |_|      |_|  \\__,_|  \\__|  \\__, | | .__/   \\__,_| |___/\n\
                                                 __/ | | |                  \n\
                                                |___/  |_|                  "
};

Interface.prototype.welcome = function () {
  console.log(this.pic, '\n', this.title)
  this.browse();
};

Interface.prototype.browse = function () {

};

module.exports = Interface;
