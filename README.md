# #OnePageWonder v1.0.0-RC.2 (in progress) by @iDoMeteor

# TL;DR

Allow me to introduce you to the newest (and fastest-to-launch) tool in your Meteor toolkit, #OnePageWonder by @iDoMeteor!  It comes with a ton of great tools built in such as jQuery, jQuery UI, Bootstrap (complete with toolbar shortcuts!), and Font Awesome.  All built on time of the real-time Meteor platform!

It also takes advantage of the latest logging and security tools such as Google's new real-time analytics, Rollbar and Astronomer event logging, and the Sikka firewall for application-level security on the server.

Stay tuned on [on Twitter](http://twitter.com/idometeor) for the latest news, screenshots and videos.  I anticipate the new page editor to be complete very soon.

[#OnePageWonder YouTube playlist](https://www.youtube.com/playlist?list=PLz5iYsoODTu6kzFGCfB4a1JXw1ZpJXLqg)

# Demo

* There is a demo of RC.1 running at http://demo.idometeor.com
* It resets twice a day
* You can download the actual deployed code in my
  [tarballs](http://github.com/idometeor/tarballs)

# When?

As soon as I get the page editor and my top secret navigation system done, One Page Wonder will be ready for use facing the Internet.

There is an extensive roadmap on the [Trello development board](https://trello.com/b/nIod234T/development), it will be updated this week.

# Haiku:

    Need much money man
    Value time above all else
    Use One Page Wonder!

# Why

I started this because after working on [#MeteorPress](http://github.com/iDoMeteor/MeteorPress) for two months (or so), I needed to find a faster path to profit.  I also needed to really hone in on some of the finer points of Meteor in a more tightly confined space.

Hence, #OnePageWonder arose.  My goal is to make it prestine.  I want it to be small, succint and extremely fast.  My PHP CMS (still) has a load time of (just checked) 0.117 seconds on first load after a long time sleeping and .034 on a ^S-r refresh.  Executing about 25-35 queries.

I want #OnePageWonder (and #MeteorPress) to beat that.  And load analytics.  With Meteor and Meteorhacks tools by @Arunoda, I know I can do it!

Fast to set up, fast to make beautiful, fast to pop custom hacks & plugs into.. and faster profits for Meteor developers like you and I, that's the purpose of #OnePageWonder!:D

# Style & Layout

You can get a concise view by looking at the [tree.txt](https://github.com/iDoMeteor/onepagewonder/blob/master/notes/tree.txt) or [tree-d.txt (directories only)](https://github.com/iDoMeteor/onepagewonder/blob/master/notes/tree-d.txt).

# Current Status

This is RC 2 (in progress), I will do my best to make upgrades painless..but this is mostly made for 'set it and forget it' style production  When you or your client outgrow your stable OPW install, commit to an upgrade (I intend to make a one-click migration tool) and move to MeteorPress!

~~Current this is really stable~~ Last week this was really stable (with content, without page editor).  This past week I worked over my .meteor hacking on packages (just learning) and it seems as if there may be some bugs I missed (at least on remote deployment with everything enabled and tuned to production mode).

Each of my software packages have a defined early life span and perform their base expectations for the level, as follows:
  - v1.0.0-beta.1 (proof of concept, input & output)
  - v1.0.0-beta.2 (add a few features)
  - v1.0.0-beta.3 (file layout takes shape and UI elements get color)
  - v1.0.0-RC.1 (user interface is roughed out, advanced features & debugging)
  - v1.0.0-RC.2 (almost ready, needs thorough testing and low-hanging fruit picked)
  - v1.0.0-Final \o/
  -
Also, my documentation tends to be better than my readme files.

> [Temporary home](http://opw.idometeor.com) will be chock full of documentation immediately after the page editor & event logging features are complete.

# Y NO PAGE EDIT?!

I just kept putting it off because there were other little things distracting me and I wanted to map it out clearly in my head.  Taking it from an inline editor to a Bootstrap modal with sorting, new page, edit pages and edit configuration is a bit more intricate.

The good news is, during that time I debugged everything else really well (using content I put into via RC.1).  So, as the editor is quite segregated from the rest of the code now it should be easy peasy & introduce next to 0 issues!

I also took the opportunity to reboot my Vim setup (desperately needed), make a proper Meteor skeleton for myself and figure out which linters I wanted to commit to and set them up quite well.

All good for my end users and contributors alike!

# Feedback:

Tweet it to .@iDoMeteor with #OnePageWonder. Customized sites w/screenshots ftw!

Please provide general feedback to me via Twitter public mention, for bug reports use DM with your favorite pasting service of choice with the console logs from both the server & client, your browser & os, and description of problem.  Preferably in a such a way that will allow me to reproduce it.

Bug and feature requests on Github or Trello, please.

# Community

For now, we can use Github.  If we need to expand, http://forums.meteor.com or IRC would be best.

# Production Quality?

Currently, I would be comfortable running low-volume sites with this (upon 1.0!), hosted on Meteor.com.  Before throwing 50k-100k hits at it, it probably needs to have all the queries optimized, some memoization & throttling, and Oplog integration.  So much Meteor and only one poor old me. :D

# Installation

* $ git clone git@github.com:iDoMeteor/OnePageWonder.git
* $ cd OnePageWonder && meteor
* Browse to http://localhost:3000
    (unless launched with --port xxxx or deployed remotely)

# Details

* Edit ./opw/lib/init/config.js if you wish to jump start your project
* Put anything site/project specific in ./\_site-specific to prevent it being
  over-written in the future.
* Hit the login button.  If there are no users, it will show the account
    creation button.  If you have already created your one and only user,
    simply log in.
* There is always a home row
* The scroll indicator only appears if there is more than the home row
* All the Bootswatch themes are included, edit ./opw/client/opw.less to change
    the active theme.  They are in packages/bootstrap-themes/.
* Upgrading from this version.. database is stable, files fairly,
    but any changes you make to them you will need to merge yourself
    (or just make a new site and leave that one alone cuz it's running so good! :D)
* For now, if you wish to deploy to Meteor.com *and* take your local data with you,
    you will have to do that manually, but I have a script doing it for me now that will be included soon.
* I left my images & etc for OPW site so u can copy and paste from there to test if you like.
* To quickly prototype a site from another Boostrap site, you can simply copy the inner HTML
    of a section's container into a row and edit it.  I tend to write my own
    and use the Wonderbar, IMO it takes just as long to figure out and
    customize someone else's.
* Click the gear to access configuration and the section editor.
* It opens on a drag-to-sort list of sections (if more than one).
* The buttons at the top take you to the section editor, system configuration &
  back again.  And maybe the log viewers & stuff soonishly.
* Use the Wonderbar (it's seriously amazing, check the [opw-elements.html](https://github.com/iDoMeteor/OnePageWonder/blob/master/opw/client/wonderbar.html)) to insert 90% of the components available in a full BS install, headings, images, etc.
* PROFIT

# Example Content

> Coming soon.  Might be some hidden in the repo somewhere.

# Caveats:

* I did not intend to release this until 1.0.0-Final, but I couldn't wait
any longer!
* I use emoticons & give myself sass in the comments @ 4am.
* Password reset: From Meteor shell, Meteor.users.remove({})
* Bugs! GAR

# Possible Issues:

* If you get locked out or whatever, just $meteor shell then Meteor.users.remove({})
* It goes way bad: try meteor reset (my code won't cause, but yours might :>)

## Official @iDoMeteor Coding Guidelines

Please read https://github.com/iDoMeteor/meteor-javascript-coding-style, especially if you intend to submit pull requests.  If you just intend to write section plug-ins, elements & themes.. then by all means, write
in whichever manner brings you the most joy!


# Screen Shots

Coming soon, till then [check my Twitter](http://twitter.com/iDoMeteor/media).

# Videos on YouTube

[#OnePageWonder YouTube playlist](https://www.youtube.com/playlist?list=PLz5iYsoODTu6kzFGCfB4a1JXw1ZpJXLqg)

# Security & Accountability

I believe in designing a secure system from the start with full accountability and analytics, both of my projects aim to capture every click, IP address and page load (or DDP connection) right from install.  It's not quite there yet, but it will be soon.

# Lastly:

Meteor is cutting edge technology, and in my opinion also a 'best-in-class' quality framework.  The results you will be able to produce by having a stable platform built upon it will be amazing, and I can't wait to see them!

The software I have published this weekend will drive my freelancing career for many years to come.  However, it has taken me six months of self-funded development. If you use it for commercial purposes (and I hope you do!), it would be splendid if you could contribute code, documentation or pizza. :D

Thanks for checking it out.  Now, go make you a Meteor!
