console.log ('#OnePageWonder v1.0.0-beta.1 Loading API');
/******************************************************************************
 *
 * #OnePageWonder by @iDoMeteor
 * v1.0.0-beta.1
 *
 *
 * TODO:
 *      Stop passing event and just pass the value!
 *      Or make it cool for both
 *      I never neglect my documentation so much, but quickest
 *      route to profit is my agenda right now! :p
 *
 *
 *****************************************************************************/

OPW = {

    cacheRestore: function () {
    },

    cacheCreate: function () {
    },

    getAllRows: function (limit, fetch) {

        // Locals
        limit           = limit || null;
        fetch           = ('boolean' == typeof(fetch))
                          ? fetch : true;
        var selector    = {}
        var projection  = {
            limit:      limit,
        };

        // Do it
        return (fetch) ? (
            opwRows.find(selector, projection).fetch()
        ) : (
            opwRows.find(selector, projection)
        )
    },

    getAllActiveRows: function (limit, fetch) {

        // Locals
        limit           = limit || 8;
        fetch           = ('boolean' == typeof(fetch))
                          ? fetch : true;
        var selector    = {
            removed:    {$ne: true},
            stale:      {$ne: true},
        }
        var projection  = {
            limit:      limit,
        };

        // Do it
        return (fetch) ? (
            opwRows.find(selector, projection).fetch()
        ) : (
            opwRows.find(selector, projection)
        )
    },

    getHomeRow: function (fetch) {

        // Locals
        fetch       = ('boolean' == typeof(fetch))
                          ? fetch : true;
        selector    = {
            removed:    {$ne: true},
            slug:       'top',
            stale:      {$ne: true},
        };

        // Do it
        return (fetch) ? (
            opwRows.findOne(selector)
        ) : (
            opwRows.find(selector, {limit: 1})
        )
    },

    getIdFromSlug: function (slug) {

        // Permissions check
        if (!Meteor.userId()) {
            console.log('#OnePageWonder ERROR You must be logged in');
            return;
        }

        if (!OPW.isString(slug)) {
            return false;
        }

        var selector    = {
            removed:    {$ne: true},
            slug:       slug,
            stale:      {$ne: true},
        }

        // Do it
        return opwRows.findOne(selector)._id;

    },

    getRows: function (limit, fetch) {

        // Locals
        limit           = limit || 8;
        fetch           = ('boolean' == typeof(fetch))
                          ? fetch : true;
        var selector    = {
            removed:    {$ne: true},
            slug:       {$ne: 'top'},
            stale:      {$ne: true},
        }
        var projection  = {
            limit:      limit,
            sort:       {'stamps.created': 1},
        };

        // Do it
        return (fetch) ? (
            opwRows.find(selector, projection).fetch()
        ) : (
            opwRows.find(selector, projection)
        )
    },

    getUserIp: function () {
        // TODO
    },

    init: function () {
        if (0 == opwRows.find({removed: {$ne: true}, stale: {$ne: true}}).count()) {
            opwRows.insert({
                content: opwDefaultContent,
                slug: 'top',
                stamps: {
                    created: new Date(),
                },
            }, function (error, id) {
                (id)
                    ? console.log('#OnePageWonder INFO Loaded default home row')
                    : console.log('#OnePageWonder ERROR Could not load default home row');
            });
        }
    },

    invalidContent: function () {
        $('textarea').addClass('bg-invalid', 200, function () {
            $('textarea').removeClass('bg-invalid', 400);
        });
    },

    invalidTitle: function () {
        $('input').addClass('bg-invalid', 200, function () {
            $('input').removeClass('bg-invalid', 400);
        });
    },

    ipIsInContacts: function (ip) {

         ip = ip || Meteor.userIp;
        console.log('IP: ' + Meteor.userIp);
        // TODO: Search for IP in contacts

    },

    isCollectionId: function (value) {
        return (/^\x{24}$/.test(value))
            ? true
            : false;
    },

    isFunction: function (value) {
        return ('function' == typeof(value))
            ? true
            : false;
    },

    isString: function (value) {
        // Alias
        return OPW.isValidString(value);
    },

    isValidContact: function (value) {

        // TODO: Check for dupes by ip and address

        // Validate type
        if (!OPW.isString(value)) return;
        // Validate Twitter nick or email
        return (OPW.isValidTweeter(value) || OPW.isValidEmail(value)) 
            ? true : false;

    },

    isValidContent: function (value) {
        return ('string' == typeof(value))
            ? true
            : false;
    },

    isValidEmail: function (value) {
        if (!OPW.isString(value)) return false;
        value = value.trim();
        return (/^.{1,255}\@[\w-.]{1,255}$/.test(value))
            ? true
            : false;
    },

    isValidSlug: function (value) {
        return ('string' == typeof(value))
            ? true
            : false;
    },

    isValidString: function (value) {
        return ('string' == typeof(value))
            ? true
            : false;
    },

    isValidTitle: function (value) {
        return ('string' == typeof(value))
            ? true
            : false;
    },

    isValidTweeter: function (value) {
        if (!OPW.isString(value)) return false;
        value = value.trim();
        return (/^@\w{1,15}$/.test(value))
            ? true
            : false;
    },

    popModalNewNavItem: function () {

        return;

    },

    pressedControlEnter: function (event) {
        if (
            (event) 
            && (event.ctrlKey) 
            && (event.which) 
            && (
                (10 == event.which) 
                || (13 == event.which) 
            )
        ) {
            return true;
        } else {
            return false;
        }
    },

    // These should all take either event or keycode
    pressedEnter: function (event) {
        if (
            (event) 
            && (event.which) 
            && (
                (10 == event.which) 
                || (13 == event.which) 
            )
        ) {
            return true;
        } else {
            return false;
        }
    },

    pressedTab: function (event) {
        if (
            (event) 
            && (event.which) 
            && (9 == event.which)
        ) {
            return true;
        } else {
            return false;
        }
    },

    removeRow: function (id) {

        // Check perms
        if (!Meteor.userId()) {
            console.log('#OnePageWonder ERROR j00 must be l0gged in');
            return;
        }

        // Validate
        if (!OPW.isString(id)) {
            console.log('#OnePageWonder ERROR Invalid ID');
            return;
        }

        // Do it
        opwRows.update({
                    '_id':              id
            }, {
                $set: {
                    'removed':          true, 
                    'stamps.removed':   new Date()
                }
            });

    },

    insertContact: function (string, callback) {

        // Validate
        if (!OPW.isValidContact(string)) {
            console.log('#OnePageWonder ERROR Invalid value encountered trying to insert contact');
            return false;
        }

        // Locals
        var stamp  = new Date();
        var source = null; // TODO: User IP

        // Formulate insert object
        var obj = (OPW.isValidTweeter(string)) ? ({
            twitter: string,
            stamp: new Date(),
            source: null,
        }) : ({
            email: string,
            stamp: new Date(),
            source: null,
        });

        // Do eet
        opwContacts.insert(obj, function (error, id) {

            var appendTarget    = '#opw-contact';
            var result          = (id) ? (
                // Remove contact form
                $('#opw-contact-form').children().remove(),
                // Render thank you
                template = UI.render(Template.opwContactThankYou, $(appendTarget).get(0)),
                // Set return value
                true
            ) : (
                // TODO: Methodize
                // Remove default indicator
                $('#opw-contact-flag').removeClass('fa-flag-o text-muted'),
                // Remove valid indicator
                $('#opw-contact-flag').removeClass('fa-flag-checkered text-success'),
                // TODO: Scroll to bottom/new section
                // Set invalid indicator
                $('#opw-contact-flag').addClass('fa-flag text-danger'),
                // TODO: Set error alert

                // Focus input
                $('#opw-contact-input').focus(),
                // Set return value
                false
            );

            // Send it home
           return (OPW.isFunction(callback)) ? callback(result) : result; 

        });
    },

    insertNav: function (event) {

        // Permissions check
        if (!Meteor.userId()) {
            console.log('#OnePageWonder ERROR You must be logged in');
            return;
        }

        // Validate
        if (!event) {
            return;
        }

        // Check keypress
        if (
            (event.which) // This will allow blur event to work
            && (!OPW.pressedEnter(event))
        ) {
            return;
        }

        // Locals
        var obj     = {};
        var slug    = null;
        var target  = $(event.target);
        var val     = target.val();
        val         = val.trim();

        // Validate
        if (
            (!OPW.isString(val))
            || (!val.length)
            || (20 < val.length)
        ) {
            OPW.invalidTitle();
            return;
        };

        // Create slug
        slug = OPW.stringToSlug(val);

        // Formulate insert object
        obj = {
            content:    null,
            slug:       slug,
            title:      val,
            stamps:     {
                created: new Date(),
            },
        }

        // Save to database
        opwRows.insert (obj, function (error, id) {

            var result = (id) ? (
                // Drop it up
                $('#opw-new-nav').hide('drop', {direction: 'up'}, function () {
                    // Remove it
                    $('#opw-new-nav').remove();
                    // Assign id to textarea
                    $('textarea').attr('data-id', id);
                    // Assign slug to textarea
                    $('textarea').attr('id', slug);
                    // Assign scroll event to new thingy
                    $('[href=' + slug + ']').addClass('page-scroll');
                    $('[href=' + slug + ']').bind('click', OPW.scrollToHref);
                    // Move focus to textarea
                    $('textarea').focus();
                }),
                // Log
                console.log ('#OnePageWonder SUCCESS Inserted new navigation item')
            ) : (
                // Set failure message
                OPW.invalidTitle(),
                console.log ('#OnePageWonder FAILURE Failed to insert navigation item')
            )

            return;

        });

        return;

    },

    insertRow: function (event) {

        // Permissions check
        if (!Meteor.userId()) {
            console.log('#OnePageWonder ERROR You must be logged in');
            return;
        }

        if (!OPW.pressedControlEnter(event)) {
            return;
        }

        // Alert user if attempting to save before nav item

        // Locals
        var id      = $(event.target).attr('data-id');
        var modifier= {};
        var selector= {};
        var slug    = $(event.target).attr('id');
        var target  = $(event.target);
        var val     = target.val();
        val         = val.trim();

        // Validate
        if (
            (!OPW.isString(val))
            || (!val.length)
        ) {
            OPW.invalidContent();
            return;
        };

        // Formulate update objects
        selector = {
            _id:       id,
        }
        modifier = {
            $set: {
                content: val,
                'stamps.modified': new Date(),
            },
        }

        // Save to database
        opwRows.update (selector, modifier, function (error, affected) {

            var result = (affected) ? (
                // Drop it out
                $('#opw-new-section').hide('drop', {direction: 'down'}, function () {
                    // Remove it
                    $('#opw-new-section').remove();
                    // Scroll to it
                    /* If the DB read doesn't occur quick enough,
                     * this will fail... Metoerize it.. :)
                     */
                    $('html, body').stop().animate({
                        scrollTop: $('#' + slug).offset().top
                    }, 1500, 'easeInOutExpo');
                    // Refresh scroll spy
                    $('body').scrollspy('refresh');
                }),
                // Log
                console.log ('#OnePageWonder SUCCESS Inserted new row content')
            ) : (
                // Flash input
                OPW.invalidContent(),
                // Set failure message
                console.log ('#OnePageWonder FAILURE Failed to insert new row content')
            )

            return;

        });

        return;

    },

    navigationAdded: function () {
        // TODO
    },

    navigationChanged: function () {
        // TODO
    },

    navigationRemoved: function () {
        // TODO
    },

    sm: function () {

        return;

    },

    updateRow: function (obj) {

        // Permissions check
        if (!Meteor.userId()) {
            console.log('#OnePageWonder ERROR You must be logged in');
            return;
        }

        // Locals
        var modifier    = {};
        var selector    = {};

        var content     = obj.content.trim()        || null;
        var id          = obj.id                    || null;
        var isTop       = obj.isTop                 || null;
        var target      = obj.target                || null;
        var title       = obj.title                 || null;

        var contentParent       = $(target).closest('.container');
        var contentElement      = contentParent.find('.opw-row-editor');
        var slug                = OPW.stringToSlug(title)   || 'top';

        if (!isTop) {
            var titleElement    = $('#opw-title-editor');
            var titleParent     = titleElement.parent();
        }

        // Validate
        if (!OPW.isValidContent(content)) {
            console.log('#OnePageWonder ERROR Content is invalid');
            OPW.invalidContent();
            return;
        };
        if (!OPW.isValidString(id)) {
            console.log('#OnePageWonder ERROR Invalid ID encountered trying to update row');
            return;
        };
        if (!OPW.isValidSlug(slug)) {
            console.log('#OnePageWonder ERROR Invalid slug encountered trying to update row');
            return;
        };
        if (
            (!isTop)
            && (!OPW.isValidTitle(title)) 
        ) {
            console.log('#OnePageWonder ERROR Title is invalid');
            OPW.invalidTitle();
            return;
        };

        // Formulate update objects
        selector._id = id;
        (isTop) ? (
            modifier = {
                $set: {
                    content: content,
                    slug: slug,
                    'stamps.modified': new Date(),
                },
            }
        ) : (
            modifier = {
                $set: {
                    content: content,
                    slug: slug,
                    title: title,
                    'stamps.modified': new Date(),
                },
            }
        );

        // Save to database
        opwRows.update (selector, modifier, function (error, affected) {

            if (affected) {
                // Drop textarea parent section
                contentElement.hide('drop', {direction: 'down'}, function () {
                    // Remove textarea
                    contentParent.children().remove();
                    // Insert content
                    contentParent.append(
                        '<div class="row opw-row-content">'
                        + content
                        + '</div>'
                    );
                    // Hide content
                    contentParent.find('.opw-row-content').hide();
                    // Show content
                    contentParent.find('.opw-row-content').show('drop', {direction: 'down'});
                });
                if (!isTop) {
                    // Drop input parent section
                    titleElement.hide('drop', {direction: 'up'}, function () {
                        // Remove input
                        titleElement.remove();
                        // Insert title
                        titleParent.append(
                            '<a class="page-scroll" href="#'
                            + slug
                            + '">'
                            + title
                            + '</a>'
                        );
                        // Hide title
                        titleParent.find('#' + slug).hide();
                        // Assign events
                        titleParent.find('#' + slug).bind('click', OPW.scrollToHref);
                        // Show title
                        titleParent.find('#' + slug).show('drop', {direction: 'up'});
                    });
                }
                // Toggle editor icon
                contentParent.find('.fa-floppy-o').switchClass('fa-floppy-o', 'fa-pencil');
                // Refresh scroll spy
                $('body').scrollspy('refresh');
                // Log
                console.log ('#OnePageWonder SUCCESS Updated row content')
            } else {
                // Flash inputs
                OPW.invalidContent();
                OPW.invalidTitle();
                // Set failure message
                console.log ('#OnePageWonder FAILURE Failed to update row content')
            }

            return;

        });

        return;

    },

    scrollToHref: function (param, callback) {

        // TODO: Validate

        // Requires jQuery UI w/easing set
        var target = (param.target)
            ? $(param.target).attr('href')
            : param;
        if (target && ($(target).offset)) {
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top
            }, 1500, 'easeInOutExpo',
                (OPW.isFunction(callback)) ? callback(target) : null);
        }

    },

    stringToSlug: function (string) {
        
        if (!OPW.isString(string)) {
            return false;
        }
        var slug = string.toLowerCase().trim();

        // TODO: Node transliterate

        // Convert non-alpha chars to - cuz I hate typing _
        slug = slug.replace(/[\W]/g, '-');
        // Consolidate multiple hyphens
        slug = slug.replace(/-{2,}/g, '-');

        return slug;

    },


    version: function () {
        return "v1.0.0-beta.1";
    },

}
