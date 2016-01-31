console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading API');
/*******************************************************************************
 *
 * @Summary     #OnePageWonder Application Programming Interface
 * @Version     v1.0.0-RC.2 {{Rowdy Rainbow}}
 *
 * @Author      @iDoMeteor, iDoMeteor@Gmail.com, aka Jason Edward White
 * @Class
 * @File        /lib/opw/api.js
 * 
 *
 * @Description
 *
 * This file provides methods available to both the client and the server and
 * processes all database interactions as well as complex / repetitive client
 * events.  Instantiated as a global object, I use this interface to side-step
 * the traditional Meteor.methods approach.  
 *
 * You may use them if you wish in your own code, but I will not accept pull 
 * requests littered with them.  Of course, you may find it difficult to get 
 * database stuff past the deny all rules. ;>
 *
 * It would behoove you to properly extend the object's prototype.  It is an
 * object, yes.  It is not, however, meant to propogate or maintain state.
 * Therefore, there is and shall ever be, just one instance of it.
 *
 * All methods that return query results from the database take an optional 
 * fetch parameter allowing it to pass a cursor to publications and reactive 
 * queries.
 *
 * If you wish to contribute or extend this API and intend to submit a pull
 * request, *please* read the coding style section of the README.md. :)
 *
 * TODO:
 *      Versioning (not retrieving but storing) is all but written, really
 *          just need to change the updates to inserts.
 *      Add userActive, isLoggedIn, isAnonymousUser
 *
 * ****************************************************************************/

OPW = {

    /***************************************************************************
     *
     * @Summary         Bootstrap linter
     * @Access          Determined via configuration
     * @Method          bootLint
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client
     *
     * @Description
     *
     *      Loads the latest Twitter Bootstrap Linter via Bootstrap CDN, runs
     *      the report and appends it to the body as well as providing conole
     *      output.
     *
     * ************************************************************************/
    
    bootLint: function () {

        if (opw.linter.requireLogin && !Meteor.userId()) {
            console.log('ERROR You must be logged in to run the linters');
            return;
        }

        var script      = document.createElement("script");
        script.onload   = function () {
            bootlint.showLintReportForCurrentDocument([]);
        };
        script.src =
            'https://maxcdn.bootstrapcdn.com/bootlint/latest/bootlint.min.js';
        document.body.appendChild(script)

    },
    bsLint: this.bootLint, // Alias


    /**************************************************************************
     *
     * @Summary         Check for duplicate contact request
     * @Method          contactExists
     * @Param           n/a
     * @Returns         {boolean}   Returns true upon failure as well
     * @Location        Client, Server
     *
     * @Description
     *
     *      Checks for an existing contact request by a user's email or Twitter
     *      handle, as well as their IP.
     *
     * ************************************************************************/
    
    contactExists: function (string, ip) {

        // Validate IP & check for dupe
        if (OPW.isValidIp(ip)) {
            OPW.log('Checking for duplicate source IP', 1);
            console.log(opwContacts.find({source: ip}).count());
            if (opwContacts.find({source: ip}).count()) {
                OPW.log('ERROR This source already exists in contact log', 2);
                return true;
            }
        } else {
            OPW.log('ERROR Invalid IP when checking for duplicates', 2);
            return true;
        }

        // Validate string & check for dupe
        if (OPW.isValidEmail(string)) {
            OPW.log('Checking for duplicate email', 1);
            return (opwContacts.find({email: string}).count());
        } else if (OPW.isValidTweeter(string)) {
            OPW.log('Checking for duplicate twitter handle', 1);
            return (opwContacts.find({twitter: string}).count());
        } else {
            OPW.log('ERROR Invalid contact when checking for duplicates', 2);
            return true;
        }

    },


    /***************************************************************************
     *
     * @Summary         Count number of users registered
     * @Method          countUsers
     * @Param           n/a
     * @Returns         {number}    A positive integer or false
     * @Location        Client, Server
     *
     * ************************************************************************/
    
    countUsers: function () {
        return Meteor.users.find().count();
    },


    /***************************************************************************
     *
     * @Summary         Updates DOM to alert user to invalid contact request
     * @Method          contactFormInvalid
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Removes non-invalid flag classes and adds invalid class
     *
     *      TODO:
     *              Pop alert
     *              GSAP
     *
     * ************************************************************************/
    
    contactFormInvalid: function (template) {
        // Remove default indicator
        $(template.find('.opw-contact-flag')).removeClass('fa-flag-o text-muted');
        // Remove valid indicator
        $(template.find('.opw-contact-flag'))
                .removeClass('fa-flag-checkered text-success');
        // Set invalid indicator
        $(template.find('.opw-contact-flag')).addClass('fa-flag text-danger');
    },


    /***************************************************************************
     *
     * @Summary         Resets the contact form to initial state
     * @Method          contactFormReset
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Removes valid & invalid flags and sets the open flag
     *
     * ************************************************************************/
    
    contactFormReset: function (template) {
        // Remove valid indicator
        $(template.find('.opw-contact-flag'))
                .removeClass('fa-flag-checkered text-success');
        // Remove invalid indicator
        $(template.find('.opw-contact-flag')).removeClass('fa-flag text-danger');
        // Assign default indicator
        $(template.find('.opw-contact-flag')).addClass('fa-flag-o text-muted');
    },


    /***************************************************************************
     *
     * @Summary         Sets the valid flag on the contact form
     * @Method          contactFormValid
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Removes the default and invalid flags and sets the valid flag
     *
     * ************************************************************************/
    
    // Contact valid
    contactFormValid: function (template) {
        // Remove default indicator
        $(template.find('.opw-contact-flag')).removeClass('fa-flag-o text-muted');
        // Remove invalid indicator
        $(template.find('.opw-contact-flag')).removeClass('fa-flag text-danger');
        // Set valid indicator
        $(template.find('.opw-contact-flag'))
                .addClass('fa-flag-checkered text-success');
    },


    /***************************************************************************
     *
     * @Summary         Wraps Accounts.createUser and manipulates DOM
     * @Method          createUser
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Calls Accounts.createUser and logs appropriate messages on failure,
     *      or resets the form, pops a welcome message & takes user to /
     *
     * ************************************************************************/
    
    createUser: function (options) {

        Accounts.createUser(options, function (error) {
            if (error) {
                // Failure
                OPW.log('ERROR Failed to create new user: ' 
                            + error);
                OPW.log('ERROR This most likely means the '
                            + 'one and only user allowed has already been '
                            + 'created.  If you are locked out, issue '
                            + 'Meteor.users.remove({}) on the server and then '
                            + 'create a new user.');
                // TODO: Set alert

                return false;
            } else {
                // Success
                $('#opw-auth-email').val('');
                $('#opw-auth-password').val('');
                $('#opw-authenticate').modal('hide');
                OPW.popAlert(opw.strings.newUserWelcome, 'success');
                OPW.log('SUCCESS Created admin user: ' 
                        + options.email);
                // Go home
                Router.go('/');
                return true;

            }

        });

    },


    /***************************************************************************
     *
     * @Summary         Selects all rows, regardless of flags
     * @Method          getAllRows
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Returns every row in the database unless limited by limit
     *
     * ************************************************************************/
    
    // Get *all* rows, subject to possible limit
    getAllRows: function (limit, fetch) {

        // Check perms
        if (!Meteor.userId()) {
            OPW.log('ERROR j00 must be l0gged in');
            return;
        }

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


    /***************************************************************************
     *
     * @Summary         Get all active rows
     * @Method          getAllActiveRows
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Selects all rows that should be displayed to an anonymous user.
     *      That means they are not stale, not removed.  Potentially limited
     *      by limit.  If fetch is passed in as false, then a cursor will be
     *      returned.  Otherwise, the resulting collection of documents will 
     *      be returned, which could be falsey if there are no matches.
     *
     * ************************************************************************/
    
    // Get *all* active rows (not stale or removed)
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


    /***************************************************************************
     *
     * @Summary         Gets the home row data
     * @Method          getHomeRow
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Selects the active home row and returns a single document or cursor
     *
     * ************************************************************************/
    
    // Retrieve the currently active data for the home row
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


    /***************************************************************************
     *
     * @Summary         Takes a valid slug and selects its active document
     * @Method          getIdFromSlug
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Gets the ID of the active document matching the slug provided,
    //  it is used when performing updates from the client (prevents
    //  the need to publish it)
    getIdFromSlug: function (slug) {

        // Permissions check
        if (!Meteor.userId()) {
            OPW.log('ERROR You must be logged in');
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


    /***************************************************************************
     *
     * @Summary         Get active non-home rows
     * @Method          getRows
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // This gets the currently active rows for display 
    //      (not any of: home, stale, removed)
    // TODO:
    //      Sort order
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


    /***************************************************************************
     *
     * @Summary         Get full document for a row by _id
     * @Method          getRowById
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // This will get any row by ID, if it exists
    getRowById: function (id, fetch) {

        // Validate
        if (id && !OPW.isCollectionId(id)) {
            OPW.log('ERROR Invalid call to editor');
            return false;
        }

        // Locals
        var row = OPW.getRowById(id) || Blaze.toHTML('opwEditorContentExample');
        fetch   = (OPW.isBoolean(fetch)) ? fetch : true;

        // Do it
        return (fetch) ? (
            opwRows.find({_id: id}).fetch()
        ) : (
            opwRows.find({_id: id})
        )

    },


    /***************************************************************************
     *
     * @Summary         Gets current connection IP from iDM CL
     * @Method          getUserIp
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // TODO: Get user IP from iDM Site Log
    getUserIp: function () {
        return;
    },


    /***************************************************************************
     *
     * @Summary         Initializes the #OnePageWonder database on first run
     * @Method          init
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Initialize the database with instructional home row 
    // (runs when no rows exist)
    init: function () {

        var selector = {
            removed: {$ne: true}, 
            stale: {$ne: true},
        }

        if (0 == opwRows.find(selector).count()) {
            opwRows.insert({
                content: opwDefaultContent,
                slug: 'top',
                stamps: {
                    created: new Date(),
                },
            }, function (error, id) {
                (id)
                    ? OPW.log('INFO Loaded default home row')
                    : OPW.log('ERROR Could not load default home row');
            });
        }

    },


    /***************************************************************************
     *
     * @Summary         Determines navigational style and hooks up scroll events
     * @Method          instantiateNavigation
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    instantiateNavigation: function () {

        // Locals
        var style = (
            opw 
            && OPW.isObject(opw.navigation) 
            && OPW.isString(opw.navigation.style)
        ) ? (
            'instantiateNavigation' + opw.navigation.style
        ) : (
            OPW.log('WARNING Invalid navigation style detected, falling back '
                    + 'to horizontal standard'),
            'instantiateNavigationHorizontal'
        );

        // All navigation styles hook into Bootspy, set it up
        $('body').attr('data-spy', 'scroll');
        $('body').css('position', 'relative');
        $('body').attr('data-target', '#opw-navigation');
        $('body').scrollspy({target: '#opw-navigation' });

        // Assign page scroll events
        $('.page-scroll').bind('click', OPW.scrollToHref);

        // Style specific instantiations
        OPW[style]();

    },


    /***************************************************************************
     *
     * @Summary         Sets up specifics of BS horizontal navgiation
     * @Method          instantiateNavigationHorizontal
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     *      TODO:
     *              Still feel like collapse offset should be read dynamically
     *
     * ************************************************************************/
    
    instantiateNavigationHorizontal: function () {

        // Collapse navbar header when not at top
        $(window).scroll(function() {
            if (opw.navigation.collapseOffset < $('#opw-primary-nav').offset().top) {
                $('.navbar-fixed-top').addClass('top-nav-collapse');
                $('body').addClass('opw-body-less-padding');
            } else {
                $('.navbar-fixed-top').removeClass('top-nav-collapse');
                $('body').removeClass('opw-body-less-padding');
            }
        });

    },


    /***************************************************************************
     *
     * @Summary         Sets up MeteorPress style navigation environment
     * @Method          instantiateNavigationMeteorPress
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     *      TODO
     *
     * ************************************************************************/
    
    instantiateNavigationMeteorPress: function () {
        return;
    },


    /***************************************************************************
     *
     * @Summary         Performs set up for the scrolling menu system
     * @Method          instantiateNavigationScrolling
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     *      TODO
     *
     * ************************************************************************/
    
    instantiateNavigationScrolling: function () {

        return;
        OPW.sm();
        var anchors = [
            {
                backgroundColor: "#00f",
                className: "opw-sm",
                label: "Test",
            },
        ]
        var template = Blaze.toHTML(Template.opwSM);
        var options = {
            anchorSetup: anchors,
            sectionClass: 'opw-sm',
        }
        var opwScrollMenu = ScrollMenu(options);
        OPW.log(JSON.stringify(opwScrollMenu, null, 4));

    },


    /***************************************************************************
     *
     * @Summary         Hook up events and environment for BS stacked pills
     * @Method          instantiateNavigationStacked
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     *      TODO
     *              Fix classes for side menu
     *
     * ************************************************************************/
    
    // Determine navigation style and set it up
    instantiateNavigationStacked: function () {


    },


    /***************************************************************************
     *
     * @Summary         Alert user that the content they have entered is invalid
     * @Method          invalidContent
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Flash the textarea if it cannot be saved
    invalidContent: function () {
        $('textarea').addClass('bg-invalid', 200, function () {
            $('textarea').removeClass('bg-invalid', 400);
        });
    },


    /***************************************************************************
     *
     * @Summary         Alert user that they have tried to save an invalid title
     * @Method          invalidTitle
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Flash the nav title input if it cannot be saved
    invalidTitle: function () {
        $('input').addClass('bg-invalid', 200, function () {
            $('input').removeClass('bg-invalid', 400);
        });
    },


    /***************************************************************************
     *
     * @Summary         Check connection log for this an IP
     * @Method          ipExists
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Returns true if checked IP exists in the iDM connection log
     *
     * ************************************************************************/
    
    ipExists: function (ip) {

        // Validate IP & check for dupe
        if (OPW.isValidIp(ip)) {
            return (idmConnectionLog.find({source: ip}).count());
        } else {
            OPW.log('ERROR Invalid IP when checking for duplicates');
            return false;
        }

    },


    /***************************************************************************
     *
     * @Summary         Checks contact log for current user's IP
     * @Method          ipIsInContacts
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Checks the contact log for the client IP
    ipIsInContacts: function (ip) {

         ip = ip || Meteor.userIp;
        OPW.log('IP: ' + Meteor.userIp);
        // TODO: Search for IP in contacts

    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is of type Boolean
     * @Method          isBoolean
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for type of function
    isBoolean: function (value) {
        return ('boolean' == typeof(value))
            ? true
            : false;
    },

    isBool: this.isBoolean, // Alias

    /***************************************************************************
     *
     * @Summary         Checks if parameter is a string matching a Mongo ID
     * @Method          isCollectionId
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject to match a Meteor/Mongo collection _id string
    isCollectionId: function (value) {
        return (/^\x{24}$/.test(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is of type date
     * @Method          isDate
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for type of string
    isDate: function (value) {
        return ('date' == typeof(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is of type Function
     * @Method          isFunction
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for type of function
    isFunction: function (value) {
        return ('function' == typeof(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is a string of one or more digits
     * @Method          isNumber
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for [0-9]
    isNumber: function (value) {
        return (/^[0-9]?$/.test(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is of type Object
     * @Method          isObject
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for type of object (could be array or something else)
    isObject: function (value) {
        return ('object' == typeof(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          scrollToHref
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/

    isStaticFooterShowing: function () {
        return (
            (opw.footer.show)
            && ('static' == opw.footer.style)
        ) ? true : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is of type String
     * @Method          isString
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for type of string
    isString: function (value) {
        return ('string' == typeof(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          isTemplate
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/

    isTemplate: function (value) {
        return (Blaze.isTemplate(value));
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          isTemplateInstance
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/

    isTemplateInstance: function (value) {
        return value instanceof Blaze.TemplateInstance;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is a valid email or Twitter address
     * @Method          isValidContact
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject (contact submission) to ensure it is either
    // a valid Twitter handle or email address (intranets supported)
    // and if so, returns true if the client's IP is not already
    // in the contact log or false otherwise.
    isValidContact: function (value) {

        // TODO: Check for dupes by ip and address

        // Validate type
        if (!OPW.isString(value)) return;
        // Validate Twitter nick or email
        return (OPW.isValidTweeter(value) || OPW.isValidEmail(value)) 
            ? true : false;

    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is a valid document for insertion
     * @Method          isValidContactDocument
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    isValidContactDocument: function (obj) {

        var whitelist = [
            'email',
            'label',
            'source',
            'stamp',
            'twitter',
        ]

        if (!OPW.isObject(obj)) return false;
        if (_.omit(obj, whitelist).length) {
            return false;
        }

        // Label
        if (!OPW.isString(obj.label)) return false;

        // Source
        if (!OPW.isValidIp(obj.source)) return false;

        // Stamp
        if (!OPW.isDate(obj.stamp)) return false;

        // Contact
        if (
            (OPW.isValidEmail(obj.email))
            || (OPW.isValidTweeter(obj.twitter))
        ) return true;

        return false;

    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is row content
     * @Method          isValidContent
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject to make sure it is a string (could do more,
    // but not much danger here, thanks to Meteor & BP, etc)
    isValidContent: function (value) {
        return ('string' == typeof(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is a valid email, intranet friendly
     * @Method          isValidEmail
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject to make sure it is a valid email address that
    // can be parsed by a standard mail server, which is rather forgiving.
    // Allows for intranet addresses (ie; admin@server).
    isValidEmail: function (value) {
        if (!OPW.isString(value)) return false;
        value = value.trim();
        return (/^.{1,255}\@[\w-.]{1,255}$/.test(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter matches an IPv4 address
     * @Method          isValidIp
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    isValidIp: function (value) {
        if (!OPW.isString(value)) return false;
        value = value.trim();
        return (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value))
            ? true
            : false;
    },

    /***************************************************************************
     *
     * @Summary         Checks if parameter is a valid mail object
     * @Method          isValidMailObject
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    isValidMailObject: function (value) {

        // Validate
        if (!OPW.isObject(value)) {
            OPW.log('ERROR Attempting to validate improperly formatted mail'
                    + ' object: \n'
                    + JSON.stringify(value), 2);
            return false;
        }

        // Sanitize keys
        var whitelist = _.pick(value, 'to', 'from', 'subject', 'text');

        // Check for additions
        if (whitelist.keys().length != value.keys().length) {
            OPW.log('ERROR Attempting to validate potentially malformed'
                    + ' notification object: \n'
                    + JSON.stringify(value), 2);
            return false;
        }

        // Lazyyyy
        return (
            (OPW.isValidEmail(whitelist.to))
            && (OPW.isValidEmail(whitelist.from))
            && (OPW.isValidString(whitelist.subject))
            && (OPW.isValidString(whitelist.text))
        ) ? (
            true
        ) : (
            OPW.log('ERROR Validating mail object failed'),
            false
        )

    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is a string matching a valid slug
     * @Method          isValidSlug
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests subject for slug validity (alphanumeric + _ or -)
    isValidSlug: function (value) {
        if (!OPW.isString(value)) return false;
        if (!value.trim().length) return false;
        return (
            (/[^\w\._~-]/.test(value)) 
            || (/--/.test(value)) 
        ) ? false : true;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is of type String
     * @Method          isValidString
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tests a subject for type of string
    isValidString: function (value) {
        // Alias
        return OPW.isString(value);
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is navigation title
     * @Method          isValidTitle
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Checks that subject is a string with a reasonable limit
    isValidTitle: function (value) {
        return (
            ('string' == typeof(value))
            && (25 > value.length) // TODO: Make dynamic
        ) ? true : false;
    },


    /***************************************************************************
     *
     * @Summary         Checks if parameter is a valid Twitter handle
     * @Method          isValidTweeter
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Tweet tweet tweetildeedildeet, is it valid?
    isValidTweeter: function (value) {
        if (!OPW.isString(value)) return false;
        value = value.trim();
        return (/^@\w{1,15}$/.test(value))
            ? true
            : false;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          popAlert
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    popAlert: function (content, type, duration) {

        // Validate
        if (!OPW.isString(content)) {
            OPW.log('ERROR Invalid attempt to create alert');
            return false;
        }
        if (!OPW.isString(type)) {
            type = opw.bootstrap.alert.type;
        }
        if (!OPW.isNumber(duration)) {
            duration = opw.bootstrap.alert.duration;
        }
        var data = {
            content: content,
            duration: duration,
            type: type,
        }

        // Render editor into DOM w/data
        Blaze.renderWithData(Template.opwAlert, data, $('body')[0]);

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          popEditor
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    popEditor: function (id) {

        
        // Locals
        var row = OPW.getRowById(id) || { // Get row by ID validates
            id: 0,
            title: 'New Row',
            slug: 'opw-new-row',
            content: Blaze.toHTML('opwEditorContentExample').trim(),
        };

        // Render editor into DOM w/data
        Blaze.renderWithData(Template.opwEditor, row, $('body'));

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          popLightbox
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    popLightbox: function (options) {

        // Validate TODO: Better
        if (!OPW.isObject(options)) {
            OPW.log('ERROR Invalid attempt to pop lightbox');
        }
        if (options.template && !Blaze.isTemplate(Template[options.template])) {
            OPW.log('ERROR Invalid template passed to lightbox');
        }

        // Render into the DOM
        // Should pop automagically via onRendered hook
        UI.renderWithData(Template.opwLightbox, options, $('body')[0]);

        return;

    },

    popModal: this.popLightbox, // Alias

    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          pressedControlEnter
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Checks event to see if control-enter-like key was pressed
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


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          pressedEnter
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Checks event or number (TODO) to see if enter-like key was pressed
    pressedEnter: function (event) {
        
        var key = (event && event.which) ? event.which : event;
        if (
            (10 == key)
                || (13 == key)
        ) {
            return true;
        } else {
            return false;
        }

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          pressedTab
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Checks event or number (TODO) to see if tab has been pressed
    pressedTab: function (event) {
        
        var key = (event && event.which) ? event.which : event;
        if (9 == key) {
            return true;
        } else {
            return false;
        }

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          removeRow
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Removes a row by ID, checks for authenticated user
    removeRow: function (id) {

        // Check perms
        if (!Meteor.userId()) {
            OPW.log('ERROR j00 must be l0gged in');
            return;
        }

        // Validate
        if (!OPW.isString(id)) {
            OPW.log('ERROR Invalid ID');
            return;
        }

        // Do it
        opwRows.update({
            '_id': id
        }, {
            $set: {
                'removed':          true, 
                'stamps.removed':   new Date()
            }
        });

    },


    /***************************************************************************
     *
     * @Summary         Inserts a validated contact into the database
     * @Method          insertContact
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    
    insertContact: function (string, template, callback) {

        // Validate
        if (!OPW.isValidContact(string)) {
            OPW.log('ERROR Invalid value encountered trying to insert contact', 2);
            return (OPW.isFunction(callback)) ? callback(false) : false; 
        }
        if (!OPW.isTemplateInstance(template)) {
            OPW.log('ERROR Invalid template while trying to insert contact', 2);
            return (OPW.isFunction(callback)) ? callback(false) : false; 
        }

        // Locals
        var context         = template;
        var contact         = string;
        var target          = $(template.find('form').closest('.opw-contact'));
        var stamp           = new Date();
        var source          = Blaze._globalHelpers.currentIp();
        var label           = $(template.find('form'))
                                .closest('.opw-contact')
                                .attr('id')
                            || 'opw-contact-request';

        // Debug
        OPW.log('Source IP requesting contact: ' + source, 1);

        // Check for dupes
        if (Meteor.call('opwContactExists', contact, source)) {
            OPW.log('ERROR You have already registered for this request');
            // Set invalid flag
            OPW.contactFormInvalid(template);
            // Set error alert
            OPW.popAlert('You or someone with your IP has already requested '
                         + 'this type of contact', 'danger');
            $(template.find('.opw-contact-input')).focus();
            return (OPW.isFunction(callback)) ? callback(false) : false; 
        }

        // Formulate insert object
        var obj = {
            label: label,
            stamp: new Date(),
            source: source,
        }
        if (OPW.isValidTweeter(contact))  {
            obj.twitter = contact;
        } else {
            obj.email = contact;
        }

        // Do eet
        opwContacts.insert(obj, function opwContactInsertCallback (error, id) {

            var result = (id) ? (
                // Remove contact form
                target.children().remove(),
                // Render thank you
                UI.render(Template.opwContactThankYou, 
                          target.get(0)),
                // Provide temporal confirmation
                OPW.popAlert(opw.contact.thankYouAlert, 'success'),
                // Notify admin
                OPW.notifyAdmin(JSON.stringify(obj, null, 4)),
                // Set return value
                true
            ) : (
                // Failure
                OPW.log('ERROR Performing insertion of new contact failed: '
                       + error, 2),
                // Set invalid flag
                OPW.contactFormInvalid(context),
                // Set error alert
                OPW.popAlert('We were unable to process your request, '
                    + 'please try again in a moment.', 'danger'),
                // Focus input
                $(context.find('.opw-contact-input')).focus(),
                // Set return value
                false
            );

            // Send it home
           return (OPW.isFunction(callback)) ? callback(result) : false; 

        });
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          insertNav
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Inserts a navigation item into the database
    // TODO: This should process data and not the event
    //          The event should be handled via a method as well
    //          Post processing should probably be out-sourced as well
    insertNav: function (event) {

        // Permissions check
        if (!Meteor.userId()) {
            OPW.log('ERROR You must be logged in');
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
                OPW.log ('SUCCESS Inserted new navigation item')
            ) : (
                // Set failure message
                OPW.invalidTitle(),
                OPW.log ('FAILURE Failed to insert navigation item')
            )

            return;

        });

        return;

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          insertRow
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Inserts a content row into the database
    // TODO: This should process data and not the event
    //          The event should be handled via a method as well
    //          Post processing should probably be out-sourced as well
    insertRow: function (event) {

        // Permissions check
        if (!Meteor.userId()) {
            OPW.log('ERROR You must be logged in');
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
                $('#opw-new-section').hide(
                    'drop', 
                    {direction: 'down'}, 
                    function () {

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
                    }
                ),
                // Log
                OPW.log ('SUCCESS Inserted new row content')
            ) : (
                // Flash input
                OPW.invalidContent(),
                // Set failure message
                OPW.log ('FAILURE Failed to insert new row content')
            )

            return;

        });

        return;

    },


    /***************************************************************************
     *
     * @Summary         Uses CSS ID to choose & insert a Wonderbar Element
     * @Method          insertBootstrapElement
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Determins which button was activated & inserts appropriate template
    insertWonderbarElement: function (id) {

        // Validate
        if (!OPW.isString(id)) {
            OPW.log('ERROR Invalid attempt to insert toolbar element');
            return false;
        }

        // Locals & action
        var element  = id.substr(7)
        element      = element.charAt(0).toUpperCase();
        element      = element.replace('-', '');
        var template = 'opwElement' + element;
        var append = '\n'
            + Blaze.toHTML(Template[template])
            + '\n';
        var target = $('#opw-editor-textarea');
        var value = target.val() + append;
        target.val(value);

    },


    /***************************************************************************
     *
     * @Summary         Logger of console messages & alerts..if convienent
     * @Method          log
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     *      TODO: Re-factor, lazy
     *            Add a bunch more levels for doing cool stuff
     *
     * ************************************************************************/
    
    log: function (msg, level, type) {

        type = type || 'info';
        if (opw.debug && (1 == level)) {
            console.log ('#OPW DEBUG ' + msg);
        }
        if (2 == level) {
            console.log ('#OPW ' + msg);
        }
        if (3 == level) {
            OPW.popAlert(msg, type);
        }

        return;
    },


    /***************************************************************************
     *
     * @Summary         logAdminNotification
     * @Method          navigationAdded
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    logAdminNotification: function (data) {

        // Validate
        if (!OPW.isValidMailObject(data)) {
            OPW.log('ERROR Attempting to log invalid mail object');
        }

        // Log it
        opwAdminNotificationLog.insert(data);
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          logAuthentication
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // TODO this & failures
    logAuthentication: function (user) {
        return;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          loginWithPassword
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    loginWithPassword: function (email, password) {

        Meteor.loginWithPassword (email, password, function (error) {
            email = (OPW.isString(email)) ? email : 'Invalid email';
            return (error) ? (
                OPW.log('ERROR ' + email + ' cannot login: ' + error, 2),
                OPW.log('Invalid credentials supplied while trying to'
                        + ' authenticate', 3, 'danger'),
                false
            ) : (
                $('#opw-auth-email').val(''),
                $('#opw-auth-password').val(''),
                $('#opw-authenticate').modal('hide'),
                OPW.popAlert(opw.strings.userLogin, 'success'),
                Router.go('/'), 
                true
            )
        });
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          navigationAdded
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    navigationAdded: function () {
        // TODO: Reactive method called when processing changes to the database/DOM
        return;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          navigationChanged
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    navigationChanged: function () {
        // TODO: Reactive method called when processing changes to the database/DOM
        return;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          navigationRemoved
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    navigationRemoved: function () {
        // TODO: Reactive method called when processing changes to the database/DOM
        return;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          noRowsExist
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Get total row count
    notifyAdmin: function (message, callback) {

        if (Meteor.isServer) {
            this.unblock();
        } else {
            return (OPW.isFunction(callback)) ? callback(false) : null;
        }

        // Locals
        var to      = (opw && opw.contact && OPW.isString(opw.contact.recips))
                    ? opw.contact.recips 
                    : Meteor.users.findOne({}, {fields: {email: 1}}).email;
        var from    = to;
        var subject = opw.title || 'Contact Request from Your OPW Site!';
        var mail    = {};
        var message = (OPW.isString(message)) ? message : (
            OPW.log('EROR Attempting to notify admin with invalid message: '
                    + JSON.stringify(message, null, 4), 2),
            'Invalid message, check logs @' + new Date()
        )

        // Validate
        if (!OPW.isValidEmail(to)) {
            OPW.log('ERROR Admin contact has been improperly configured');
            return (OPW.isFunction(callback)) ? callback(false) : null;
        }

        // Formulate mail object
        mail = {
            from: from,
            subject: subject,
            text: message,
            to: to,
        }

        // Log it
        OPW.logAdminNotification(mail);

        // Send it
        Email.send(mail);

        return (OPW.isFunction(callback)) ? callback(true) : null;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          noRowsExist
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Get total row count
    noRowsExist: function () {
        return (opwRows.find().count()) ? false : true;
    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          scrollIndicatorUpdate
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Control scroll indicator targets upon scroll spy activation
     *
     *      TODO: Change to scroll to top if *close* to bottom
     *            May as well let them scroll upward anytime
     *            & to top when @ bottom
     *
     * ************************************************************************/
    
    scrollIndicatorUpdate: function () {

        var first    = 'top';

        // Get array of navigation list elements as sorted by helper
        var sections = $('section');
        var ids      = [];
        var numSecs  = sections.length;

        // Check
        if (2 > numSecs) {
            // Should not have been called in the first place
            OPW.log('No need for scroll indicator update', 1);
            return;
        }

        // Formulate ID array
        $(sections).each(function () {
            ids.push($(this).attr('id'));
        });

        // Determine currently active
        var active = $('#opw-navigation')
                        .find('.active')
                        .find('a')
                        .attr('href');
        active = (OPW.isString(active)) ? active.substr(1) : first;

        // Determine active position within section array
        var currentIndex = _.indexOf(ids, active);
        if (-1 == currentIndex) {
            OPW.log('ERROR Could not find currently active navigation item '
                + 'within the known good sections', 2);
            return;
        }

        // Determine last
        var last = (OPW.isStaticFooterShowing())
                 ? 'opw-footer'
                 : ids[ids.length - 1];

        // Determine next
        var next = (currentIndex < numSecs - 1)
            ? ids[currentIndex + 1]
            : false;

        // Determine previous
        var prev = (currentIndex)
            // Booyah
            ? ids[currentIndex - 1]
            : false;

        // Instantiate state object
        var state = {
            active: active,
            first: first,
            last: last,
            next: next,
            prev: prev,
        }

        // Debug
        // OPW.log('SI State: ' + JSON.stringify(state, null, 4), 1);

        // Return
        Session.set('opwScrollState', state);
        return state;

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          scrollToHref
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      Animates the DOM scroll to passed href, curries target to optional 
     *      callback
     *
     *      TODO: Might want to manually set the active class upon arrival
     *
     * ************************************************************************/
    
    
    scrollToHref: function (param, callback) {

        // TODO: Validate

        // Requires jQuery UI w/easing set
        var target = (param && param.target)
            ? $(param.target).attr('href')
            : param;


        // Determine height of navigation bar, if any
        var targetTop = ('#top' == param)
            ? 0
            : ($(target) && $(target).offset() && $(target).offset().top)
                // Don't ask. :>
                ? $(target).offset().top
                : 0;

        // Do it
        $('html, body').stop().animate({
                // TODO: Make dynamic or smarter
                scrollTop: targetTop
            }, 
            1500, 
            'easeInOutExpo',
            (OPW.isFunction(callback)) ? callback(target) : null
        );

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          sm
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Sourcery
    sm: function () {

        // MUUAHAHAHA
        return;

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          stringToSlug
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // This makes URL/href friendly slugs from a string (ie; nav title)
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


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          updateRow
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Updates row content, must be valid & logged in
    // TODO:
    //      Post processing should probably be out-sourced
    updateRow: function (obj) {

        // Permissions check
        if (!Meteor.userId()) {
            OPW.log('ERROR You must be logged in');
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

        var contentParent       = $(target).closest('section');
        var contentElement      = contentParent.find('.opw-row-editor');
        var slug                = OPW.stringToSlug(title)   || 'top';

        if (!isTop) {
            var titleElement    = $('#opw-title-editor');
            var titleParent     = titleElement.parent();
        }

        // Validate
        if (!OPW.isValidContent(content)) {
            OPW.log('ERROR Content is invalid');
            OPW.invalidContent();
            return;
        };
        if (!OPW.isString(id)) {
            OPW.log('ERROR Invalid ID encountered trying to update row');
            return;
        };
        if (!OPW.isValidSlug(slug)) {
            OPW.log('ERROR Invalid slug encountered trying to update row: '
                       + JSON.stringify(slug, null, 4));
            return;
        };
        if (
            (!isTop)
            && (!OPW.isValidTitle(title)) 
        ) {
            OPW.log('ERROR Title is invalid');
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
                    contentParent.find('.opw-row-content')
                        .show('drop', {direction: 'down'});
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
                        titleParent.find('#' + slug)
                            .bind('click', OPW.scrollToHref);
                        // Show title
                        titleParent.find('#' + slug)
                            .show('drop', {direction: 'up'});

                    });
                }
                // Toggle editor icon
                contentParent.find('.fa-floppy-o')
                    .switchClass('fa-floppy-o', 'fa-pencil');
                // Refresh scroll spy
                $('body').scrollspy('refresh');
                // Log
                OPW.log ('SUCCESS Updated row content')
            } else {
                // Flash inputs
                OPW.invalidContent();
                OPW.invalidTitle();
                // Set failure message
                OPW.log ('FAILURE Failed to update row content')
            }

            return;

        });

        return;

    },


    /***************************************************************************
     *
     * @Summary         XXX
     * @Method          version
     * @Param           n/a
     * @Returns         undefined
     * @Location        Client, Server
     *
     * @Description
     *
     *      XXX
     *
     * ************************************************************************/
    
    // Return current #OnePageWonder version
    version: function () {
        return "v1.0.0-RC.2";
    },


}
