
Platypus Web Browser
=================

Makers Academy final project to build an original web browser with Node.js in two weeks, by Filipe Fasolin, Ngoc Linh Sammy Ha, Peter Barcsak, and Will Gant.

![Platypus demo](https://media.giphy.com/media/l4FGCv3TyOLaM9p5K/giphy.gif =300x300)

Installation & Testing
--------

* Fork or clone this repo, and run `npm install`
* Tests can be run by running `jasmine` on the command line

Use
--------

* Click the address bar at the top of the screen, type a web address, and hit enter
* Scroll through page content using your mouse wheel or trackpad
* To follow links, look up the link number in the box on the right side of the screen, and type it into the address bar
* That's it!

Features
--------

* Totally original HTML parser and rendering engine, written in vanilla JavaScript with no libraries
* Renders the text of a website, with special styling for headers and links
* Link functionality supports URLs with both absolute and relative paths
* Browser correctly redirects when HTTP response received with a 3xx status code

Technologies & Principles
--------

* JavaScript/Node.js
* Jasmine
* Blessed

* Test-driven development
* Recursion
* Management of asynchronicity

How we did it
--------

How did we end up choosing something so complicated, when so many other browsers already exist?

First and foremost, we wanted a challenge. We wanted to learn as much as we could by really stretching our technical abilities, and at the same time we thought it was a great excuse to get better acquainted with how the web really works. We had all built websites and apps before, but we had only a hazy idea of how browsers actually present these to the user.

After reading up on the core components of a browser, our first hurdle was decide *what* we would actually build. We found no shortage of Stack Overflow posts advising against build your own HTML parser, for instance. The complexity was too great, and anyway, the posts advised sagely, parsing HTML is a "solved problem". Why would you attempt to write your own when wise men and women have already spent thousands of hours developing software that already does the job flawlessly? A similar logic applied to rendering engines, and almost every other part our browser would need.

> *If you want to write the next "Greaterest HTML parserer" then give it up. Apache (or somebody else) wins; the important information is: you don't know more than the large groups that specialize in parsing HTML.*
>> <cite>Stack Overflow comment</cite>

We pondered this for a while, and in the end agreed that, nonetheless, we wanted to make everything ourselves. We would all learn much more from the experience, and the final product would be all the more impressive for our struggles.

We began by building a basic parser, to take a string of HTML and break it into chunks we would be able to use later to render a page, and after some discussion we decided that those chunks should be organised in arrays of arrays - one for each element. The very first thing we did was to write a test for our parser taking `'<p>Hello world!</p>'` and returning `['<p>', 'Hello world!', '</p>']`. We passed the test by using JavaScript string functions to isolate the angle brackets surrounding each tag, and then cut at the appropriate index and pushed to the array.

Unfortunately, most websites have more complex structures than this, and our next priority was to find a way to deal with nested tags. We hit on recursion as a solution, with our parse function re-running itself whenever it encountered a new tag. After a short while, we ended up with something that could parse more complicated HTML, including asymmetrical structures such as where there were multiple sets of tags on a particular layer.

At this point, we could have continued to make the parser more and more sophisticated, but we made a strategic decision to move on and instead aim to build a string of basic components that, together, would be capable of rendering our simple [test website](http://web-browser-test.herokuapp.com/) in the console. Next came the renderer, for which we again used recursion - this time to cycle through the arrays until we found content lying between tags, at which point we logged it to the console.

After this, we built an object to make HTTP get requests. Scenting our first major victory, we raced ahead, mocking up a [first command line interface](https://github.com/ffasolin/web-browser/blob/master/platypus.js) with a cool logo, and bringing all our components together to enable us to do this:

![19621815_10214130448362194_824571723_n](https://user-images.githubusercontent.com/20523607/27761462-09363e64-5e54-11e7-9da5-ea11f73d8492.png)

Wow! What a great feeling. We really had a web browser now. It might have been capable of visiting 0.0000001% of websites on the net, but the entire process was now running from start to finish.

Up until this stage, we had worked on everything as a group of four, as we thought it was vital that everyone have a full understanding of the core architecture of what we were building. After this, we split into pairs and began checking out tasks from a Trello board. The next period was one of incremental improvements, particularly to the parser and renderer, which needed to get better at differentiating between content that the user should see, and HTML tags, scripts, and other material that should stay behind the scenes.

Progress started to really accelerate, and we soon set our sights on improving the user interface to make it look more like familiar, modern web browsers and (slightly) less retro. We gave a lot of thought as to whether, at this stage, to try to build a standalone application and a new renderer capable of placing elements at particular coordinates, but in the end we felt it was better to prioritise adding more basic browser functionality, in particular links. After building an attractive console interface with Blessed - the sole external library used in our project - we set to work on links. We first explored the possibility of making these clickable, but in the end settled on a solution that rendered a box of numbered links for every page, allowing users to type a number in the address bar to visit the corresponding URL. Later improvements included the styling of headers and the ability to redirect following 3xx HTTP responses.

All that remained at the end was to spruce up our layout, and add a prettier Ascii logo to our welcome page.

![screenshot 2017-07-01 at 09 28 15](https://user-images.githubusercontent.com/20523607/27761720-8d476e80-5e59-11e7-9430-39334187968e.png)

![screenshot 2017-07-01 at 12 38 50](https://user-images.githubusercontent.com/20523607/27761752-45f4559c-5e5a-11e7-83df-675225bfe5c5.png)


Ta da!
