# #OnePageWonder v1.0.0-RC.2 by @iDoMeteor

#Intro

Allow me to introduce you to the newest (and fastest-to-launch) tool in 
your #MeteorJS profit machine, #OnePageWonder by @iDoMeteor!

This is RC 2, I will do my best to make upgrades painless..but this is mostly 
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
    * I left my images & etc for OPW site so u can copy and paste from there to test if you like,
        you want to copy the inner HTML of a section's container. :)
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
    * *sigh* I am considering using check :|
    * I use too many emoticons & give myself sass in my comments
    * Password reset: From Meteor shell, Meteor.users.remove({}) :)

###Possible Issues:

    * If you get locked out or whatever, just $meteor shell then Meteor.users.remove({})
    * It goes way bad: try meteor reset (my code won't cause you to do it, but yours might :>)
    * I passed my friend a copy I made while Meteor was running, he had to rm -rf .meteor/local

##Procedural Execution View:

##Asynchronous Considerations:

##Coding Style:

    Comments

        First and foremost, I have been writing code since 4 years of age.
        That means, I have some habits and many of them stem from many
        years of writing C & PHP.  This primarily infers I use /real/
        block comments.  Nicely formatted and with block frames whose
        width infer their semantic value.  Kind of like H tags.

        I use // for inline comments as they were designed for and you
        will seldom find more than one line's worth.

    File Structure

        Secondly, I only write code in vim.  I prefer to consolidate
        the primary code in as few files as possible because file
        & directory management in vim is easy but not exactly point
        & click.  Plus, under heavy development, adding & removing
        files to Git is a PIA.  I like writing code.

        All plugins, extensions, etc.. that are not part of the main
        code base should be contained in their own appropriately named
        directory and then broken down into as many files & folders as
        you like.

    Vertical Space

        The other implication is that I use vertical space liberally,
        but not excessivelly.  I've seen code where if statements
        that evaulate several expressions are broken up with multi-
        line comments and vertical white space between each expression..
        *that* is excessive.  I use it to generally keep everything under
        80 characters wide and break up things that make sense to operate
        on in a per-line basis from a vim-coding stand point.  For example,
        all object properties end w/commas, even the last one.  You never
        know when you'll want to toss them in a :sort or add one to the end,
        copy the last one up higher and change it, etc.. 

    White Space

        Every serious programmer and programming language in the world uses
        4 spaces as standard indentation.  So do I.

        I also like pretty code and therefore like to line up my local 
        var = signs, extra indent some ternaries, etc.  Pretty > consistency.

        It's white space after all.  Negative space is powerful, ask Hokusai
        or McKay.

    TODOs

        TODO in a comment stands out superbly in my vim setup.  However,
        @TODO does not.  Dig?  If you intend to contribute, look for and
        solve those.  They should be low-hanging fruit for the most part.

        If you find something that needs to be fixed or enhanced and want
        me to notice it (you should put it in Trello), use it.

    One-Liners

        That is also a big part of the reason 99.999% of statements that
        could be one-lined are still 3 lines w/ curly braces.. so I can
        add stuff quick w/o having to filter my into a long line, add
        curlies, new lines & /then/ add a quick statement.

    ==, ===, !, !! && ||

        I know precisely the subtle differences.  I actually read the ECMA
        262 spec from beginning to end.  You?

        I wrote strict XHTML 1.1 for many years.  What I learned is that unless
        you are doing serious mathematics or science, or are working on something
        for the finanical or medical industry.. it's really not worth the issues 
        it creates.  Regular ol' web sites should not fail in the face of your 
        user because of a little type conversion issue, a missing closing tag. 

        However, I still have to fight the urge to go strict.  
        I'm a perfectionist.

        Any performance lost by actually failing more quickly if your critical
        operand is null or undefined (the two additional steps before type
        checking in the non-strict variant) is peace of mind & reliability gained
        by writing your expressions backwards anyway. Fail fast, I say.

        That being said, I don't use !! crap because *that* is a performance
        hit that is *totally* not worth it.. since any expressions surrounded
        by paranthesis are automatically converted to a boolean.  So why then
        get all bitwise on it?

        Indeed, in the interest of performance I use ! as little as possible
        (moreso in OPW than upcoming MeteorPress) since checking for true
        is faster than checking for negation. That's why you'll see some
        validation functions as isValidX or isInvalidX both.

        I actually have always written out precisely what I expected in my
        expressions.  For instance, ('undefined' === value) rather than
        (!value).  However, in an effort to be more 'javascripty' or 'meteory',
        I have forced myself to drop that extra verbosity.  I'm not sure that
        I like it yet, but.. it works, and it saves me keystrokes.

        And, seriously.  If you're using ! or !! in your code... then using
        ==== is really just a red herring.

        As for && and ||.  I tend to like them on seperate lines that way
        it's easy to identify code that needs to be re-factored. :)

        They can be inline if they fit and it's cleaner / makes sense /
        is prettier.

        If you want to do smart things with them, like say to curry your
        return value, like so:

            return ('function' == typeof(fX)) && fX(retVal)
            or
            return criticalResult || throw new Meteor.Error

        That's cool with me.  Aside from the fact that you probably didn't
        need to hard crash there... See the error handling section.

    Ternaries

        Hated them in PHP, abusing them in JS.

        Do whatever you want, little trixster.  Just make them pretty when
        you do.

    Error Handling


##Lastly:

Meteor is cutting (& bleeding at times :>) edge technology, and I would say it is a definitely
'best-in-class' quality framework (or I would *not* be using it). MAKE PPL PAY FOR IT. :D

// For later
please install using the curl installer for each new project,
rather than say..copying your existing dirs.  this will
help me feel like someone is using it when i look
at the stats :)

'set it & forget it...till they want to pay for more :D

...extremely interested in discussions/chats about methodology, and introducing OPW to students!
