
Platypus Web Browser
=================

Makers Academy final project to build an original web browser with Node.js in two weeks, by Filipe Fasolin, Ngoc Linh Sammy Ha, Peter Barcsak, and Will Gant.

![screenshot 2017-07-01 at 09 28 15](https://user-images.githubusercontent.com/20523607/27760487-5ae10398-5e40-11e7-9d0a-00286e5aa2fa.png)

![screenshot 2017-07-01 at 09 27 17](https://user-images.githubusercontent.com/20523607/27760493-855e7b5a-5e40-11e7-8b0a-52a2702c40e0.png)

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

How did we end up choosing so complicated, when so many other browsers already exist?

First and foremost, we wanted a challenge. We wanted to learn as much as we could by really stretching our technical abilities, and at the same time we thought it was a great excuse to get better acquainted with how the web really works. We had all built websites and apps before, but we had only a hazy idea of how browsers actually present these to the user.

After reading up on the core components of a browser, our first hurdle was decide *what* we would actually build. We found no shortage of Stack Overflow posts advising against build your own HTML parser, for instance. The complexity was too great, and anyway, the posts advised sagely, parsing HTML is a "solved problem". Why would you attempt to write your own when wise men and women have already spent thousands of hours developing software that already does the job flawlessly? A similar logic applied to rendering engines, and most other thing we would end up needing.

