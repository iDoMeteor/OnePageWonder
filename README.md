# #OnePageWonder v1.0.0-PR.1  by @iDoMeteor

# TL;DR

 #OnePageWonder is a super fast yet robust mini-CMS for building one page scrolling web sites, it comes with a bunch of fancy tools like Meteor, jQuery, Bootstrap, Google Analytics and more!

[#OnePageWonder YouTube playlist](https://www.youtube.com/playlist?list=PLz5iYsoODTu6kzFGCfB4a1JXw1ZpJXLqg)
[Live Demo (fresh install)](http://demo.idometeor.com) which resets just after the top of every hour.
[Live Site (not polished yet)](http://idometeor.com)

I will soon knock back the demo resets to once or twice per day, depending on traffic.

# Haiku:

    Need much money man
    Value time above all else
    Use One Page Wonder

# Huh?

Fast to set up, fast to make beautiful, fast to hack up & plug into = Faster profits for Meteor developers & Bootstrap designers like you and I, that's the purpose of #OnePageWonder!

# Current Status

Worky pretty goody! :D

# Installation

Git It
> $ git clone git@github.com:iDoMeteor/OnePageWonder.git
> $ cd OnePageWonder && meteor

Tarball
* wget http://install.idometeor.com/onepagewonder.tar.gz
* wget http://install.idometeor.com/onepagewonder-with-data.tar.gz

Zipper
* http://install.idometeor.com/onepagewonder.zip
* http://install.idometeor.com/onepagewonder-with-data.zip

Then
* If you download a compressed archive, simply inflate it, change into it's directory and run meteor.
* Browse to http://localhost:3000 (unless launched with --port xxxx or deployed remotely)


# Roadmap

v1.0.0-PR.2
* CSV Log Downloads
* Clear separation between logic & presentation templates
* Dashboard with live stats
* Explicit data contexts for all templates & etc
* Log viewer paging
* Configuration editor (config in database)
* Rollbar support
* Vertical nagivation toggle

v1.0.0-PR.3
* Bootstrap 3/4 toggle
* ES6 / Meteor 1.3 test branch
* Materialize support
* Optimizations (OpLog, caching, throttling)
* Return of native Google Analytics support
* Two new navigation styles!

v1.0
* All 1.0 features bug fixed
* GSAP Animations
* Meteor 1.3
* Security audit
* Complete set of tests?

v1.1
* Auto-sections (intelligent dynamic CSS, live content via social media tags, etc)
* Dynamic theme editor
* Integration with TwiefBot for C&C via Twitter
* NPM packaged version

# Architecture

You can get a concise view by looking at the [tree-d.txt (directories only)](https://github.com/iDoMeteor/onepagewonder/blob/master/notes/tree-d.txt) or [tree.txt (all files)](https://github.com/iDoMeteor/onepagewonder/blob/master/notes/tree.txt).

# Documentation

The [Github wiki](https://github.com/iDoMeteor/OnePageWonder/wiki) is probably a good enough place for me to start producing documentation, feel free to add sections you want filled out.

## User Guide
This will explain the basics of installation, usage and aesthetics.  Things like how to properly layout your HTML, using the #WonderBar, changing the Bootstrap/Bootswatch theme and adding custom CSS, images and other media assets.

## Developer Guide
After I get a solid rough draft of the user guide down, I will demonstrate various ways you can extend/hack up #OnePageWonder and make it do things *you* want it do to, rather than just doing the kinds of things *I* want to do! :>

The source code is very well documented and fairly JSDoc compatible, so feel free to dig in.  You can also view the JSDocs for the API (the global OPW object) file and Meteor.methods [here](http://docs.idometeor.com) or by opening private/docs/index.html within the OPW source directory.

# Feedback:

Tweet it to @iDoMeteor with #OnePageWonder. Customized sites w/screenshots ftw!

Please provide general feedback to me via Twitter public mention, for bug reports use Github Issues with the console logs from both the server & client if possible, your browser & os of your client & server, and detailed description of problem.  Preferably in a such a way that will allow me to reproduce it.

# Community

Post on Meteor Forums, use #OnePageWonder hashtag on Twitter or chat w/me @
http://chat.idometeor.com!

# Y Bootstrap!?

Because it is as ubiquotous amongst web companies as bash is to Linux.  I want lots of people to use it, not just cutting edge hipsters! :p

# Y Blaze?!  Y not Angular, React, HippyCrack, Unicorn Sauce, etc?

I like core Meteor.  I want it to be extendable without increasing the learning curve exponentially.  There is no good reason to change render engines just because they are trendy. React makes sense for Facebook, not for a little ol' web site.

# Y Meteor Accounts?!

Same as above.  It's core Meteor.  I can rely on it.  I won't be sitting around one day doing nothing special and suddendly have useraccounts\* or some ish breaking on me for no good reason.  It totally F'd one of my buddies once and I do not intend to have that happen to me.

# Production Quality?

Dunno!  I haven't tried it, but I'm a go for it kinda guy, so... go for it!

Before throwing 50k-100k hits at it, it probably needs to have all the queries optimized, some memoization & throttling, Oplog integration and more configurable limits.  So much Meteoring to do and only one poor old me. :D

# Example Content

If you want to try the system out with some actual content in it, the images & CSS from http://iDoMeteor.com are included, regardless of how you get #OnePageWonder.  Right click on a content row there, and find the section tags for the content (pretty straightforward, eh?).  Right click on the section tag itself and hit 'copy inner HTML', then paste it into a new section in your install and hit save.  Boom, it's like magic!

Now you can edit & sort content as you please.  This is how I loaded up the tarball & zip files w/content.

# Caveats:

* I did not intend to release this until 1.0.0 attained feature completion and stability, but I'm super excited about it and couldn't wait any longer! This is the first 'public release' or 'pre-release' and is meant to provide me with some feedback so that 1.0.0 can be production quality.
* Password reset: From Meteor shell, Meteor.users.remove({})
* If it goes way bad: try meteor reset (I've never had to, but you might :>)

# Screen Shots

For now, check my [Twitter](http://twitter.com/iDoMeteor) and send me yours!

# Security & Accountability

I believe in designing a secure system from the start with full accountability and analytics, both of my projects aim to capture every click, IP address and page load (or DDP connection) right from install.  It's not quite perfect yet, but it will be soon.

# Lastly:

Meteor is cutting edge technology, and in my opinion also a 'best-in-class' quality framework.  The results you will be able to produce by having a stable platform built upon it will be amazing, and I can't wait to see them!

This has taken me months of self-funded development. If you use it for commercial purposes (and I hope you do!), it would be splendid if you could contribute code, documentation or [pizza](http://paypal.com/iDoMeteor). :D

Thanks for checking it out!

[@iDoMeteor](http://twitter.com/iDoMeteor)

[iDoMeteor.com](http://iDoMeteor.com)
