# Synopsis
## I'm not perfect, but I try.

Firstly.  #MeteorPress and #OnePageWonder are here to stay, and they wish
to be your friend and help you make money, faster.  I worked on my own,
closed source PHP content management systems exclusively for over a decade.
I will pursue of both my new babies with the same fervor and commitment,
but free to the world, forever.

These guidelines are intended for those interested in contributing to them
or for those interested in learning how others do things and maybe learning
a little something along the way.

I printed out the 6th edition ECMA spec, but I have not yet had time to read
it.  #OnePageWonder must be 1.0.0'd first! :>

# Intro

Herein lies my personal coding style guide for writing ECMA-262, specifically
for Meteor.  It is liberal in places, as it specifically relates to web
content as opposed to say, a financial or DNA analysis program.  A subtle but
distinct (to me) contextual difference with regards to typing & precision.

I like pretty. And fast, both for me and the CPU.

Some things may seem standard, some familiar, some odd.  Like writing
expressions in reverse (Yoda) to prevent accidental assignments instead of
comparisons.  Or using the faster to fail == and not wasting CPU cycles
flipping bits with !!.

I understand the ECMA language well (I read 2nd edition specification from
beginning to end in 2004) and how CPUs think very well.  It has also been
developed over a long (long) period of time coding mostly by myself.  I can
adapt to any style, but the code in these repos are *my* babies.

So, please, if you wish to judge .. judge away.  But do not be pedantic
over trivial semantics in my syntax just because you've read 1,001 tutorials
but never actually spent hundreds of hours writing original code.  However,
if you have, please enlighten me - I'll appreciate it, I promise!

If you wish to contribute code to my repositories, then please at least try
to come close to my style.. JSCS & I will do the rest if we have to.

If you just intend to write personal plug-ins, elements & themes.. then by
all means, write in whichever manner brings you the most joy!


#The Official @iDoMeteor Coding Guidelines:

## Package VS Source VS Tarball

I am just getting into package creation, my analytics and DDP logging code
will be up on Atmosphere soon, but it may take a while until I can put OPW
& MP up.  They are large, complex and it would require a lot of testing that
I do not currently have time for.

*But* if you want to help, I will work with you!


## Considerations

\#OnePageWonder is the most stylistically current and expresses a pretty
thorough presentation of my style.  I am still striving to achieve
"true Meteoriness," but... they are not 1.0.0 yet (and neither am I?)! :D

As such, they are fairly noisy, in opposition to what a 'production' CMS
should be.  There are several settings to control this, however, the
separation of client only messages is still in progress.

I intend to run two concurrent versions of both #MeteorPress and
\#OnePageWonder.  Each will be offered as a proper package, but
each will also offer a curl installer that pulls one of several
varieties (Github clone, tarball-vanilla, and tarball-example-\*).

It is my intention to provide people just coming to Meteor a stable, fun
and profitable platform from which they can "ease in" to Meteor.  Not
that I have done the research (I'm not a forum/blog cruiser really),
but I imagine that many people build a really cool, simple app only to
have it fall apart on them just before or right after finishing because
they have 87 packages installed.

It's built on a ish ton of packages in varying states of maintenance.
Things start breaking, their hopes are dashed and pockets getting slim.
What is left but to move on?

By using one of my content / application management systems, they can
actually have a stable platform that hopefully will allow them to keep
their interest and be able to really commit to the platform.

It may be an optimistic goal for an independent code artist with no reason
to set such a lofty agenda.... but I adopted PHP early because I believed
in it.  I did amazing things with it for 12 years.

The next decade belongs to Meteor.

My biggest regret, perhaps my only regret, is that I did not contribute to
PHP itself or release any of my content management systems.  I learn from
my mistakes, and now you can, too!

Lastly, much like Material Design (and Meteor), I am opinionated and for
good reasons.  However, much like ECMA Script (and Meteor), I am also
open minded and  flexible. :)


## Continuation Passing Style

     AKA, callbacks, currying, etc.  I am trying to start using the error
     first Node style, but keep forgetting. :>  I will do a big run through
     of all the code and standarize it through-out all of my Meteor code.

     This is something you should consider if contributing or extending.

## Comments

     I use C style block comments.  Nicely formatted and with block frames
     whose width infer their semantic value.  Kind of like H tags.

     I use // for one & two line comments inside blocks or appended to a
     line (rarely).

     The re-write of my PHP CMS from PHP 4 to 5 taught me a few major
     lessons, one being the value of clarity, code separation and comments.
     Therefore, since then, even though I only code alone, I have done my
     best to make my code clear, beautiful and thoroughly commented.

     I feel this is especially important in software I intend to release,
     one should never make assumptions about others' abilities.  Not only
     does roughing out code blocks with inline comments enable clarity of
     thought, it should also prove valuable for those who are seeking
     enlightenment or education.

## File Structure

     Secondly, I only write code in vim.  I prefer to consolidate
     the primary code in as few files as possible because file
     & directory management in vim is easy but not exactly point
     & click.  Plus, under heavy alpha/beta development, adding & removing
     files every couple hours or so can be a PIA.  I like writing code.

     I start with a lot of shuffling around & renaming, then settle into
     a few major files and work out my betas there.  I then break the
     project up appropriately for the release candidates and by 1.0.0
     versions, things should be stable and non-core elements modulated.

     All plugins, extensions, etc.. that are not part of the main
     code base should be contained in their own appropriately named
     directory and then broken down into as many files & folders as
     you like.

## Vertical Space

     I use vertical space liberally, but not excessivelly.  I've seen code
     where if statements that evaulate several expressions are broken up
     with multi-line comments and vertical white space between each
     expression.. that is excessive.  I use it to generally keep everything
     under 80 characters wide and break up things that make sense to operate
     on in a per-line basis from a vim-coding stand point.  For example,
     all object properties end w/commas, even the last one.  You never
     know when you'll want to toss them in a :sort or add one to the end,
     copy the last one up higher and change it, etc..

     And, of course, to add clarity to nested expressions and object
     declarations.

## White Space

     I have recently ditched my beat up, 8 year old vim config and adopted
     2 spaces instead of 4 for indentation.  Pardon the dust.

     I like pretty code and therefore like to line up my local  var = signs,
     line appended commented, extra indent some ternaries,  etc.

     Pretty > consistency often wins here. It's white space after all.
     Negative space is powerful, ask Hokusai or McKay.

## TODOs

     TODO in a comment stands out superbly in my vim setup.  However,
     @TODO does not.  Dig?  If you intend to contribute, look for and
     solve those.  They should be low-hanging fruit for the most part.

     If you find something that needs to be fixed or enhanced and want
     me to notice it (you should put it in Trello or Github really),
     use // TODO: unless it's a block-level priority, in which case
     put the * TODO: in the block comments, as I do.

     Ultimately, I should be the only one adding these to code.  They
     are notes to myself or anyone looking for cherry pie.  If you
     are submitting code that you have add TODOs to, you probably should
     not have submitted it yet.  Or you know me really well. :)

## One-Liners

     99.999% of statements that could be one-lined are still 3 lines w/
     curly braces.. so I can add stuff quick w/o having to filter my way
     into a long line, add curlies, new lines & /then/ add a quick log
     statement.

## ==, ===, !, !! && ||

     I know precisely the subtle differences.  I actually read the ECMA
     262 2nd edition spec from beginning to end, and am working my way through
     6th edition currently.

     I wrote strict XHTML 1.1 for many years.  What I learned is that unless
     you are doing serious mathematics or science, or are working on
     something for the finanical or medical industry.. it's really not worth
     the issues  it creates.  Regular ol' web sites should not fail in the
     face of your  user because of a little type conversion issue, a missing
     closing tag.

     However, I still have to fight the urge to go strict.
     I'm a perfectionist.

     With regards to using == vs ===, there are only two steps performed before
     it does a type check (first step in ===) and they validate the operands.
     Any performance lost by actually failing more quickly if your critical
     operand is null or undefined (the two additional steps before type
     checking in the non-strict variant) is peace of mind & reliability
     gained by writing your expressions backwards anyway. Fail fast, I say.

     The practice dates back to a time when IE and FF would return different
     types and many people didn't code very well.  In the context of Meteor,
     such issues are moot since everything is ubiquitized by several frameworks
     doing awesome things to take care of all those quirks.

     That being said, I don't use !! crap because *that* is a performance
     hit that is not worth it if you are just trying to test for truthiness.
     Since any expressions surrounded by paranthesis are automatically
     evaluated & converted to a boolean.  So why then get all bitwise on it,
     performing more operations?

     Indeed, in the interest of performance I use ! as little as possible
     (more in OPW than upcoming MeteorPress due to my renewed sense of urgency)
     since checking for true is faster than checking for negation. That's why
     you'll see some validation functions as isValidX or isInvalidX both.

     In PHP, and beginning Meteor, I always checked for precisely what I
     expected in my expressions. For instance, ('undefined' == typeof(value))
     rather than (!value).  However, in an effort to be more 'javascripty' or
     'meteory' (and after I figured out what failure/empty returns from Mongo
     & Meteor returned), I have forced myself to drop that extra verbosity.
     I'm not sure that I like it yet, but.. it works, and it saves me keystrokes.
     So, until I'm writing some crazy 3D space navigation... truthy/falsey
     will do fine.

     And, seriously.  If you're using ! or !! in your code... then using
     ==== in every comparrison is really just a red herring.  Use it where
     it matters.

     As for && and ||.  I like them to start new lines that way
     it's easy to identify code that needs to be re-factored. :)

     They can be inline if they fit and it's cleaner / makes sense /
     is prettier.

     If you want to do smart things with them, like say to curry your
     return value, like so:

     return ('function' == typeof(fX)) && fX(retVal)
     or
     return criticalResult || throw new Meteor.Error

     That's cool with me, I'm trying to adopt that as a policy.  Aside from the
     fact that you probably didn't need to hard crash there... See the error
     handling section.

## Ternaries

     Hated them in PHP, abusing them in JS.

     Do whatever you want, little trixster.  Just make them pretty when
     you do.  And seriously, don't use the expressions as functions.

     Re-factor.

     Again, arguing over performance would be petty.  I've done the research.
     If they were slow, every minifier in the world wouldn't use them, eh?

     Until I program that spaceship...

## Error Handling

     I prefer handling errors rather than failing, unless it is critical.
     Also, I am still working out in my head what I feel will be the most
     elegant solution that I wish to carry as a standardized methodology
     thoroughout my Meteor projects.  I expect to see it appearing in the
     code pretty soon though. :)

## Git / Github

     I haven't used them in a couple years.  I am completely dependent on
     Vim's persistent undo and session manager.

     However, from this point forward I will (attempt to) strictly follow
     the git-flow model.


## Schemas, Autoforms, Roles, and etc.

     A huge time consumer in #MeteorPress is making the admin area w/o
     relying on autoforms.  Betas 1 & 2 were fully functional, but relied
     on autoforms completely.

     I had been toying with writing my own schema/collection2/autoform
     type of thing to replace them.  I hate relying so much on a collection
     of packages by different authors all tied together, it makes me feel
     like my code will be more likely to break (ie; Iron Router 5 upgrade
         breakages took my friend out of Meteor development for 6 months).

     However, I recently found a more consolidated one that I may use.

     Allan Lanning's Roles package is good, but #MeteorPress needs more.
     So that is another huge time consumer, I spent 10 straight days writing
     that system.  But, it will only take me a couple hours to integrate
     into #OnePageWonder eventually.

     So, the packages may be hanging around..but do not rely on anything
     but the most standard and awesome packages, like accounts-* forever
     over a 3rd party set, iron-router, anything by @arunoda, etc..

## Animations, rollovers, event feedback

     Current mindset is "do they work?" and until the major code tasks
     are complete, will be fairly lack-luster.  That's your job!

     However, after I get MP & OPW both 1.0.0'd, GSAP & SVG mastering
     is top on my priority list!

## UI Frameworks

     I've been focused on perfecting the presentation and customization
     of Bootstrap for both MP & OPW.  Their goal is to provide industry
     standard awesomeness, not the latest in soon to be failed CSS
     micro-frameworks.

     When it comes to design, once upon a time I did amazing interfaces
     all day & night.  However, I am a programmer first.  So until the
     program is done, aesthetics are a bonus (wanna chip in? :D).

     That being said, I intend to provide configuration toggles that
     will automatically change MP or OPW to other frameworks I believe
     in (Materialize, Polymer, React).

     *BUT* I am still brainstorming how to most elegantly do this as
     well as dynamic themes/colors.  Dynamic, user-selectable themes
     are the very first feature of the very first CMS I ever wrote
     (circa 1999-2000) and primary feature of every one after.

     However, Meteor's file loading, template system and deep magic
     make this quite a bit more complex than it was in PHP.

     Eventually.


## Linting

### Bootstrap
     Doing it.

### CSS
     Working on it.

### HTML
     Pfffft.

### JSCS
     Yep.

### ESLint
     Yep.

### Meteor
     Integrated.

     ~~Working on tuning the linters just right in the following priorities:~~
     ~~MDG Actual packages code of most critical packages~~
     ~~MDG Actual working & provided examples code~~
     ~~MDG Style guide~~
     ~~Node rules~~
     ~~My preferences~~
     Eliminating irrelavent overkill in actual practice - in progress


### Strict Mode
     Is for machines.



## JSDocs

I use a couple non-standard tags (I plan to patch it to support them)
that are Meteor-specific.


@Blocking

This is not standard in JSDoc (which I'm still learning
    to use properly, and considering switching to YUI :>),
but will be used in all appropriate methods.
I find it a rather important thing to know about
one's method calls, particularly in Meteor.

By default, one should be able to rely on any blocking
methods to require a callback function as their last
parameter.  They will either receive true/false
based upon success, or the standard Node/Meteor
(error, result) parameters, where error should be
a string and result can be of any type it wants to be.

@Location

Client, Server or both (explicitly, not the word both)


## For Contributors


### MP & OPW Plugins/Extensions

  Much more complex to do in Meteor to do what I wish to do than it
  was in PHP.  I'm working it out in my head very well before I attempt
  it in practice. Honestly, I have plenty of other base functionality to
  work on still.

  Eventually, I will build them both point/click/search/browse repos
  for themes & extensions, like every other softwarez in the world. :)


### DOs

  * DO do whatever you want in your separate, modularized & distinct
  plugin or theme code. :D
  That being said, I will hold curated plugins and themes hosted
  on official repos & subdomains must be pretty close to these
  or judged to be of high quality by myself or the community
  * Do feel free to make sexy ternary magic, but try to
  figure out and follow my patterns
  * Do hoist your variables as far to the top as logical,
  I don't mind if they come immediately after validation
  or have complexity within them, just don't bury them somewhere
  within a nested code block (unless they are local to a
      callback function of course) or off screen of the function
  declaration.. and please align their assignment operators
* Do name your anonymous functions & callbacks.. even if I am not (see @exceptions)
  * Do make frequent and proper use of the logging functions
  provided by the APIs, they will get better
  ... there's other logging stuff I'll detail later
  * Do make friends with vertical space.. but not excessively..
  a good policy is to know that moving lines around is
  a lot easier than going through long lines, so break
  around concatenations, commas, and operators
  * Do make notes about your ideas along the way!
  * Do name all callback return values 'result'
  * Do name object parameters coming in from clients 'submission' to
  clearly mark it as needing careful validation
  * Do please test your code locally using meteor shell & logs
  I will not accept code that throws nasty messages, junk,
  is crashy, does not handle improperly formed requests,
  clashes with MP naming conventions or if I feel that they
  are generic and therefore probably not very well thought
  out and probably going to cause others problems.
  * Do put code with code and comments with comments
  * Do talk with me if you intend to submit pull requests with
  any kind of major structural changes, there is a lot
  going on in my head still. |D
  * Do use ECMA/Javasripty/Meteorish naming conventions
  * Do use a non-clashing yet consistent naming pattern
  * Do use if (Meteor.isClient) return; to start any methods which should
  never be accessible from the front.. although these methods are
  ultimately meant to be global utilities, so I have not found cause
  to do so yet.
  * Do use proper camel case upInHurr
  * Do use 2 spaces for indenting
  * Do validate in every method! (See @Exceptions if you spot one :p)


### DON'Ts

  * Thou shalt not add packages of any kind to the base without a thorough
  discussion.  The less, the better.
  * Thou shalt not use @TODO, just use todo, todo: or // todo[:]
  ... but in CAPS!  All caps todo highlights nicely for me,
  and @TODO is removed from JSDocs and I prefer that they
  be available for viewing there.
  * Thou shalt not put excessive comments within code blocks, use a
  comment block above it and make your code clean and readable.
  * Thou shalt not throw errors unless something catastrophic happens, I hate that!
  Instead, return false or undefined and handle it.


### Exceptions

  I either make them or approve them, please and thank you. :)


### My API Globals

  aaXyyZyy vars are globals that are mostly going to evaporate
  AA.xyyZyy are the APIs provided for hooking into from your add-ons.
  Since they are global, it can be used in it's own methods'
  callbacks, but don't use MP for storing state.  It will
  be doomed to an implosion.. somewhere.. eventually.  Pass
  around your state in a parameter named 'context'.
  This clashes w/Meteor Style Guide..sorta.  But it is context specific
  to my usage, and not part of Meteor core. :)

