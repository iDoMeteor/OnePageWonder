# #OnePageWonder v1.0.0  by @iDoMeteor

# TL;DR

 #OnePageWonder is a super fast yet robust mini-CMS for building one page scrolling web sites, it comes with a bunch of fancy tools like Meteor, jQuery, Bootstrap, Google Analytics and more!

Fast to set up, fast to make beautiful, fast to hack up & plug into = Faster profits for Meteor developers & Bootstrap designers like you and I, that's the purpose of #OnePageWonder!

* [#OnePageWonder YouTube playlist](https://www.youtube.com/playlist?list=PLz5iYsoODTu6kzFGCfB4a1JXw1ZpJXLqg)
* [Live Demo (fresh install)](http://demo.idometeor.com)
* [Live Site (not polished yet)](http://idometeor.com)

# Haiku:

    Need much money man
    Value time above all else
    Use One Page Wonder

# Current Status

Works great!

# Installation

Scaffold Install

    $ git clone git@github.com:iDoMeteor/OnePageWonder.git
    $ cd OnePageWonder
    $ cp settings-default.json settings.json
    $ meteor --settings settings.json

Meteor Package Install

    $ meteor create OnePageWonder
    $ cd OnePageWonder
    $ rm OnePageWonder.* # Or don't :D
    $ meteor add idometeor:onepagewonder
    $ cp settings-default.json settings.json
    $ meteor --settings settings.json

Then browse to http://localhost:3000 (unless launched with --port xxxx or deployed remotely)

> Not using the settings file will run w/package configured defaults.  The only
> difference between the defaults & settings-default.json is that debug &
> client-side console messages are disabled in the settings-default.json file.

# Roadmap

v1.0.0+
* 1.0.0 bug fixing
* Bootstrap 3/4 toggle
* CSV Log Downloads
* Clear separation between logic & presentation templates
* Complete set of tests
* Configuration editor (config in database)
* Dashboard with live stats
* ES6 / Meteor 1.3
* Explicit data contexts for all templates & etc
* GSAP or jQUI animations throughout
* Log viewer paging
* Materialize support
* Return of native Google Analytics support
* Rollbar support
* Security audit
* Three new navigation styles!

v1.1
* Angular support
* Auto-sections (intelligent dynamic CSS, live content via social media tags, etc)
* Dynamic theme editor
* Integration with TwiefBot for C&C via Twitter
* Meteor 1.3
* NPM packaged version
* Optimizations (OpLog, caching, throttling)
* Polymer support

# Architecture

Just converted from one giant code base to multiple packages.

# Documentation

I am working on the [Github wiki](https://github.com/iDoMeteor/OnePageWonder/wiki), it is not yet based on the new package system.

# Feedback:

Please provide general feedback to me via Twitter public mention, for bug reports use Github Issues with the console logs from both the server & client if possible, your browser & os of your client & server, and detailed description of problem.  Preferably in a such a way that will allow me to reproduce it.

Tweet @iDoMeteor with #OnePageWonder and customized sites w/screenshots ftw!

# Community

Post on Meteor Forums, use #OnePageWonder hashtag on Twitter or chat w/me @
http://chat.idometeor.com (let me know ur coming tho)!

# Security & Accountability

I believe in designing a secure system from the start with full accountability and analytics, both of my projects aim to capture every click, IP address and page load (or DDP connection) right from install.  It's not quite perfect yet, but it will be soon.

# Lastly:

Meteor is cutting edge technology, and in my opinion also a 'best-in-class' quality framework.  The results you will be able to produce by having a stable platform built upon it will be amazing, and I can't wait to see them!

This has taken me months of self-funded development while eating crackers and barely avoiding eviction. If you use it for commercial purposes (and I hope you do!), it would be splendid if you could contribute code, documentation or [pizza](http://paypal.com/iDoMeteor). :D

Thanks for checking it out!

[@iDoMeteor](http://twitter.com/iDoMeteor)

[iDoMeteor.com](http://iDoMeteor.com)
