# #OnePageWonder v1.0.0-PR.1  by @iDoMeteor

# TL;DR

 #OnePageWonder is a super fast yet robust mini-CMS for building one page scrolling web sites, it comes with a bunch of fancy tools like Meteor, jQuery, Bootstrap, Google Analytics and more!

[#OnePageWonder YouTube playlist](https://www.youtube.com/playlist?list=PLz5iYsoODTu6kzFGCfB4a1JXw1ZpJXLqg)
[Live Demo (fresh install)](http://demo.idometeor.com) which resets just after the top of every hour.
[Live Demo (w/iDoMeteor.com content)](http://demo2.idometeor.com) which resets just after the bottom of every hour.
[Live Site (not polished yet)](http://idometeor.com)

I will soon knock back the demo resets to once or twice per day, depending on
traffic.

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
* $ git clone git@github.com:iDoMeteor/OnePageWonder.git
* $ cd OnePageWonder && meteor
* Browse to http://localhost:3000
    (unless launched with --port xxxx or deployed remotely)

Tarball
wget http://install.idometeor.com/onepagewonder.tar.gz
wget http://install.idometeor.com/onepagewonder-with-data.tar.gz

Zipper
http://install.idometeor.com/onepagewonder.zip
http://install.idometeor.com/onepagewonder-with-data.zip

If you download a compressed archive, simply inflate it, change into it's
directory and run meteor.

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

The [Github wiki](https://github.com/iDoMeteor/OnePageWonder/wiki) is probably a good enough place for me to start producing
documentation, feel free to add sections you want filled out.

## User Guide
This will explain the basics of installation, usage and aesthetics.  Things like
how to properly layout your HTML, using the #WonderBar, changing the
Bootstrap/Bootswatch theme and adding custom CSS, images and other media
assets.

## Developer Guide
After I get a solid rough draft of the user guide down, I will demonstrate
various ways you can extend/hack up #OnePageWonder and make it do things *you*
want it do to, rather than just doing the kinds of things *I* want to do! :>

The source code is very well documented and fairly JSDoc compatible, so feel free to dig in.  You can also view the JSDocs for the API (the global OPW object) file and Meteor.methods *here*.

# Feedback:

Tweet it to @iDoMeteor with #OnePageWonder. Customized sites w/screenshots ftw!

Please provide general feedback to me via Twitter public mention, for bug reports use Github Issues with the console logs from both the server & client if possible, your browser & os of your client & server, and detailed description of problem.  Preferably in a such a way that will allow me to reproduce it.


# Community

Post on Meteor Forums, use #OnePageWonder hashtag on Twitter or chat w/me @
http://chat.idometeor.com!

# Production Quality?

Dunno!  I haven't tried it, but I'm a go for it kinda guy, so... go for it!

Before throwing 50k-100k hits at it, it probably needs to have all the queries optimized, some memoization & throttling, and Oplog integration.  So much Meteoring to do and only one poor old me. :D

# Details

* Edit ./opw/lib/init/config.js if you wish to jump start your project
* Put anything site/project specific in ./\_site-specific to prevent it being over-written in the future.
* Hit the login button.  If there are no users, it will show the account creation button.  If you have already created your one and only user, simply log in.
* There is always a home row
* The scroll indicator only appears if there is more than the home row
* All the Bootswatch themes are included, edit ./opw/client/opw.less to change the active theme.  They are in packages/bootstrap-themes/.
* Upgrading from this version.. database is stable, files fairly, but any changes you make to them you will need to merge yourself (or just make a new site and leave that one alone cuz it's running so good! :D)
* For now, if you wish to deploy to Meteor.com *and* take your local data with you, you will have to do that manually, but I have a script doing it for me now that will be included soon.
* I left my images & etc from the [iDoMeteor](http://iDoMeteor.com) site so u can copy and paste from there to test if you like.
* To quickly prototype a site from another Boostrap site, you can simply copy the inner HTML of a section's container into a row and edit it.  I tend to write my own and use the Wonderbar, IMO it takes just as long to figure out and customize someone else's.
* Click the gear to access configuration and the section editor.
* It opens on a drag-to-sort list of sections (if more than one).
* The buttons at the top take you to the section editor, system configuration & back again.  And maybe the log viewers & stuff soonishly.
* Use the Wonderbar (it's seriously amazing) to insert 90% of the components available in a full BS install, headings, images, etc.
* PROFIT

# Example Content

XXX

# Caveats:

* I did not intend to release this until 1.0.0 attained feature completion and stability, but I'm super excited about it and couldn't wait any longer! This is the first 'public release' or 'pre-release' and is meant to provide me with some feedback so that 1.0.0 can be production quality.
* I use emoticons & give myself sass in the comments @ 4am.
* Password reset: From Meteor shell, Meteor.users.remove({})
* It goes way bad: try meteor reset (I've never had to, but you might :>)

# Screen Shots

XXX
Send me yours!

# Security & Accountability

I believe in designing a secure system from the start with full accountability and analytics, both of my projects aim to capture every click, IP address and page load (or DDP connection) right from install.  It's not quite there yet, but it will be soon.

# Lastly:

Meteor is cutting edge technology, and in my opinion also a 'best-in-class' quality framework.  The results you will be able to produce by having a stable platform built upon it will be amazing, and I can't wait to see them!

This has taken me months of self-funded development. If you use it for commercial purposes (and I hope you do!), it would be splendid if you could contribute code, documentation or [pizza](http://paypal.com/iDoMeteor). :D

Thanks for checking it out!

[@iDoMeteor](http://twitter.com/iDoMeteor)
[iDoMeteor.com](http://iDoMeteor.com)
