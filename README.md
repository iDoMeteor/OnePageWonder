#Intro

Allow me to introduce you to the newest (and fastest-to-launch) tool in 
your #MeteorJS profit machine, #OnePageWonder by @iDoMeteor!

This is RC 1, I will do my best to make upgrades painless..but this is mostly 
made for 'set it and forget it' style production, to fit with the rest of our 
disposable economy. :)  When you or your client outgrow your stable OPW install, 
commit to a big upgrade and customizations or move to MeteorPress!  

Of course, I do intend to grow this into a great thing with auto-upgrades and 
plugins and all the other goodies...but... RC 1!

It's still super useable & fairly secure tho!

This is the 'ultra-simple'-est web 'app' I know how to make,
tell me if I'm doing something wrong. :D

#Haiku:

    need much money man
    value time above all else
    use one page wonder

#Feedback:

Tweet it to .@iDoMeteor with #OnePageWonder. Customized sites w/screenshots ftw!

Please provide general feedback to me via Twitter public mention, for bug reports
use DM with your favorite pasting service of choice with the console logs from both
the server & client, your browser & os, and description of problem.  Preferably in
a such a way that will allow me to reproduce it.

Bug reports will move to GH after release. I only use FF and do not have a mobile,
so device & other browser issues would be helpful.

While I am interested in bug reports, I am obviously coding my face off on this right
now.  I am extremely interested however, in discussions/comments on methodology, style
& technique, particularly with implications implicit to Meteor.

Visual discontinuities or bugs are of little interest to me right now, unless it affects
usability.

##How to use it:

    * Edit opw-config.js
    * Run meteor
    * Assuming that works (last message on screen should read: 
        #OnePageWonder v1.0.0-beta.1 Loading Main Server Environment) then
        simply load it up in your browser (localhost:3000 unless launched with --port xxxx)
    * Hit the login button, not much error checking here..check console log if
        something doesn't work as expected.  First user you create is the only
        user allowed, and is the admin. HIT CREATE NOT LOGIN LOL
    * The plus icon in header adds rows
    * There is always a home row
    * The scroll helper only appears if there is more than that
    * To save a new nav item, unfocus it or hit return
    * To save new content, hit control + enter
    * Currently, if you save a nav item and then hit plus.. you messed up. :)
    * The pencil (super tiny in Cerulean) edits.  Trash..removes! (soft)
    * The pencil changes to something which you click to save, hot keys..
        like in the add row feature, probably do not..never tried it. :)
    * All the Bootswatch themes are included, edit client/opw.less to change
        the active theme.  They are in packages/bootstrap-themes/
    * Meta tags are defined at the top of client/opw.html for now (moving asap, upgrade hazard)
    * Upgrading from this version.. database is stable, files fairly,
        but any changes you make to them you will need to merge yourself
        (or just make a new site and leave that one alone cuz it's running so good! :D)
    * For now, if you wish to deploy to Meteor.com *and* take your local data with you,
        you will have to do that manually. :)
    * PROFIT
    
###Caveats:

    * I switched the theme to Cerulean for you, but I have not debugged it
    * The BS toolbar icons.. lol.  Titles are accurate though, on hover.
    * When you add a section with a contact form (must only be one!), you
        have to hit refresh to see it.  And, you have to remove the added
        code from between the span tags if you edit the row after that!
        When I was working on it, I hadn't figured out Blaze.toHTML yet :)
    * My goal is to make this thing super perfect Bootstrap code and bla blah,
        but for now I am in also in get'r done mode :)
    * There are some big changes coming, most things will be affected by the
        integration of the configuration system yet to be written.
    * Google Analytics config is in client/lib/ganalytics.js for now,
        I am in the process of re-writing it to be more Meteory and no
        use --settings to config
    * I DON'T USE CHECK, I HANDLE SHIT :)
    * I use too many emoticons & give myself sass in my comments

###Possible Issues:

    * If you get locked out or whatever, just $meteor shell then Meteor.users.remove({})
    * It goes way bad: try meteor reset (my code won't cause you to do it, but yours might :>)
    * I passed my friend a copy I made while Meteor was running, he had to rm -rf .meteor/local

##Lastly:

Meteor is cutting (& bleeding) edge technology, and I would say it is a definitely
'best-in-class' quality framework (or I would *not* be using it). MAKE PPL PAY FOR IT. :D

// For later
please install using the curl installer for each new project,
rather than say..copying your existing dirs.  this will
help me feel like someone is using it when i look
at the stats 
'set it & forget it...till they want to pay for more :D
...extremely interested in discussions/chats about methodology, and introducing OPW to students!
