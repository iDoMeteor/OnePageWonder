console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Main Client Environment');
/******************************************************************************
 *
 * #OnePageWonder by @iDoMeteor
 * v1.0.0-RC.2
 *
 *****************************************************************************/

/******************************************************************************
 *
 * OPW Login hook
 *
 *****************************************************************************/

Accounts.onLogin(function (user) {
    // TODO: Should also log failures
    OPW.logAuthentication(user);
    // TODO: idmGA.event(category, action, label, value);
});


/******************************************************************************
 *
 * OPW alert rendered handler
 *
 *****************************************************************************/

Template.opwAlert.onRendered(function () {

    var duration = this.data.duration || 5000;
    var target = this.find('.alert');
    Meteor.setTimeout(function () {
        $(target).hide('fade', function () {
            $(target).alert('close');
        });
    }, duration);

});


/******************************************************************************
 *
 * Authentication form event handlers
 *
 *****************************************************************************/

Template.opwAuthenticate.events ({

    // Cancel authentication request, clear inputs & hide auth section
    'click #opw-auth-cancel': function (event) {
        event.preventDefault();
        $('#opw-auth-email').val('');
        $('#opw-auth-password').val('');
        $('#opw-authenticate').modal('hide');
    },

    // Create admin user
    'click #opw-auth-email-create': function (event) {
        event.preventDefault();
        var options      = {};
        options.email    = $('#opw-auth-email').val();
        options.name     = 'Admin';
        options.password = $('#opw-auth-password').val();
        options.username = 'Admin';
        OPW.createUser(options);
    },

    // Primary login feature, hide & clear inputs, go to root
    'click #opw-auth-email-login': function (event) {
        event.preventDefault();
        var email    = $('#opw-auth-email').val();
        var password = $('#opw-auth-password').val();
        OPW.loginWithPassword(email, password);
    },

    // Attempts login if return is pressed in password field
    'keypress #opw-auth-password': function (event) {
        var email    = $('#opw-auth-email').val();
        var key      = event.which; // TODO: Alter API (notes there)
        var password = $('#opw-auth-password').val();
        if (!OPW.pressedEnter(event)) {
            return;
        }
        event.preventDefault();
        OPW.loginWithPassword(email, password);

    },

});


/******************************************************************************
 *
 * Authentication helpers
 *
 *****************************************************************************/

Template.opwAuthenticate.helpers({

    showLogin: function () {
        return OPW.countUsers();
    },

});


/******************************************************************************
 *
 * Authentication helpers
 *
 *****************************************************************************/

Template.opwAuthenticate.onCreated(function () {

    this.subscribe('opwUsers');

});


/******************************************************************************
 *
 * Contact form event handlers
 *
 *****************************************************************************/

Template.opwContactForm.events({

    // TODO: When checking for dupes, check global helper for IP

    // Validate and potentially submit contact form
    'click .opw-contact-submit, keyup .opw-contact-input': function (event, template) {

        // Locals
        var submit  = (
            (OPW.pressedEnter(event))
            || ('click' == event.type)
        ) ? true : false;
        var val     = $(template.find('.opw-contact-input')).val();
        val         = val.trim();

        if (submit) event.preventDefault();

        // Reset if empty
        if (!val.length) {
            OPW.contactFormReset(template);
            return;
        }

        // Validate
        if (OPW.isValidContact(val)) {

            // Set valid flag
            OPW.contactFormValid(template);

            // Check for enter
            if (submit) {
                OPW.insertContact(val, template);
                return; // Post-processing handled in above
            }
            
        } else {

            // Set invalid flag
            OPW.contactFormInvalid(template);
            // Pop alert if they tried to submit anyway
            if (submit) {
                OPW.popAlert('You must enter a valid twitter handle or email.',
                             'danger');
            }

        }

        return;

    },

});


/******************************************************************************
 *
 * Contact form helpers
 *
 *****************************************************************************/

Template.opwContactForm.helpers({

    contactButtonString: function () {
        return opw.contact.btnString;
    },

});


/******************************************************************************
 *
 * Contact thank you helpers
 *
 *****************************************************************************/

Template.opwContactThankYou.helpers({

    contactThankYou1: function () {
        return opw.contact.thankYou1;
    },

    contactThankYou2: function () {
        return opw.contact.thankYou2;
    },

});


/******************************************************************************
 *
 * OPW Editor event handlers
 *
 *****************************************************************************/

Template.opwEditor.events({

    // Trash can handler, soft deletes a row
    'click #opw-editor-remove': function (event) {

        event.preventDefault();

        // TODO: Confirm with user

        OPW.removeRow($(event.target).attr('id'));
        Router.go('/');

    },

    // Save
    'click #opw-editor-save': function (event) {

        var param           = {};

            // Formulate parameter object
            param.id           = id;
            param.content      = content;
            param.target       = event.target;
            param.isTop        = isTop;

            if (!isTop) {
                param.title     = title;
            }

            // Update
            OPW.expireRow(param);
            OPW.insertRow(param);
            OPW.updateRow(param);

    },

});


/******************************************************************************
 *
 * OPW Editor helpers
 *
 *****************************************************************************/

Template.opwEditor.helpers({

    // Set up for the editor's select range
    opwRowSortRange: function () {
        return _.range(0,99);
    }

});


/******************************************************************************
 *
 * OPW Editor rendered handler
 *
 *****************************************************************************/

Template.opwEditor.onRendered(function () {

    $('opw-editor').modal({keyboard: false});

});


/******************************************************************************
 *
 * Footer helpers
 *
 *****************************************************************************/

Template.opwFooter.helpers ({

    opwFixedFooter: function () {
        return (opw.footer.fixed);
    },

    opwFixedScrollIndicator: function () {
        return (opw.navigation.fixedScrollIndicator);
    },

    opwShowSocialIcons: function () {
        return (opw.social.enable);
    },

});
    

/******************************************************************************
 *
 * Layout event handlers
 *
 * Currently just handles the home link and brag link
 *
 *****************************************************************************/

Template.opwLayout.events ({

    'click .opw-brag': function (event) {
        event.preventDefault();
        // Log it
        // Pop informative popover
    },

    'click .opw-root': function (event) {
        event.preventDefault();
        OPW.scrollToHref('#top', function () {
            Router.go('opwRoot');
        });
    },

});


/******************************************************************************
 *
 * Layout (seemingly global) helpers
 *
 * This currently tells the scroll indicator how to act
 *
 *****************************************************************************/

Template.opwLayout.helpers({

    fixedScrollIndicator: function () {
        return (opw.toggles.fixedScrollIndicator) ? true : false;
    },

    showScrollIndicator: function () {
        // Would be 1 < but getRows excludes top row
        return (0 < OPW.getRows().length) ? true : false;
    },

    showFooter: function () {
        // Would be 1 < but getRows excludes top row
        return (opw.footer.show);
    },

});


/******************************************************************************
 *
 * Layout rendered function
 *
 *****************************************************************************/

Template.opwLayout.onRendered(function () {

    // *poof* Pimp glitter falls all around you.
    OPW.instantiateNavigation();

});


/******************************************************************************
 *
 * OPW Lightbox rendered handler
 *
 *****************************************************************************/

Template.opwLightbox.onRendered(function () {

    var target = this.find('.modal');
    $(target).modal('show');
    $(target).on('hidden.bs.modal', function () {
        $(target).remove();
    });

});


/******************************************************************************
 *
 * Navigation events
 *
 *****************************************************************************/

Template.opwNavigation.events({

    // This hooks BSSS and sets session vars for the scroll indicator
    // One might put other possible activation hooks here
    'activate.bs.scrollspy .nav li': function () {
        state = OPW.scrollIndicatorUpdate();
        Session.set('opwScrollIndicatorState', state);
    },

    // Switch navigation styles
    'click #opw-magic': function (event, template) {
        event.preventDefault();
    },

    // Instantiate the new content editor
    'click #opw-add-row': function (event, template) {
        event.preventDefault();
        OPW.popEditor();
    },

    // Expose authentication section
    'click #opw-login': function (event) {
        event.preventDefault();
        OPW.popLightbox({
            id:         'opw-authenticate',
            cssId:      'opw-authenticate',
            footer:     false,
            label:      opw.title + ' Login',
            template:   'opwAuthenticate',
        });
    },

    // Logout
    'click #opw-logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        OPW.popAlert('Thank you, please drive through.');
    },

});


/******************************************************************************
 *
 * Navigation Helpers
 *
 * This gets the rows for giving the navigation list, their slug & link title
 * properties.  It might be theoretically more efficient or proper to use
 * a more specific query/method such as getNavProperties.. but since
 * this is ulitmately being pulled from the client side Mini-Mongo, it's
 * going to be nearly instantaneous regardless. Plus, Meteor & MM are smart
 * enough to keep repetitive reactive queries all buffered together. :)
 *
 * ... And, if it's not, I intend to potentially write some caching functions.
 *
 *****************************************************************************/

Template.opwNavigation.helpers({

    opwAllowDynamicNavigation: function () {
        if (opw && OPW.isObject(opw.navigation)) {
            return (opw.navigation.allowDynamic);
        }   
    },

    opwCollapseNavbar: function () {
        if (opw && OPW.isObject(opw.navigation) && (opw.navigation.collapse)) {
            return 'collapse navbar-collapse';
        }   
    },

    opwFluidNavbar: function () {
        if (opw && OPW.isObject(opw.navigation) && (opw.navigation.fluid)) {
            return '-fluid';
        }   
    },

    opwNavbarClasses: function () {
        var classes = 'nav navbar-nav';
        if ('MeteorPress' == opw.navigation.style) 
            classes += ' nav-meteorpress';
        else if ('Stacked' == opw.navigation.style) 
            classes += ' nav-stacked';
        else if ('Scrolling' == opw.navigation.style) 
            classes += ' nav-scrolling';
        return classes;
    },

    // Get non-stale, non-removed, non-top-slug-having rows..
    opwRows: function () {
        return OPW.getRows();
    },

});


/******************************************************************************
 *
 * Navigation rendered function
 *
 * This sets up the session properties for the scroll indicator, attempts to
 * reactively re-bind the scroll events when the navigation list content
 * changes, and tries to correct the scroll indicator session properties 
 * in the same fashion.
 *
 *****************************************************************************/

Template.opwNavigation.onRendered(function () {

    // Locals
    var persistentInstance = this;

    // TODO: May need to run the autorun stuff one time manually

    persistentInstance.autorun(function (computation) {

        // Don't hang around if we're not needed
        if (!OPW.getRows(null, false).count()) {
            console.log('DEBUG No rows to process for scrolling', 1);
            computation.stop();
        }

        Session.set('opwScrollIndicatorState', state);

        // Re-bind scroll events
        $('[data-spy="scroll"]').each(function () {
            // This is local to the each, of course
            // therefore, we can probably remove the variable
            var $spy = $(this).scrollspy('refresh');
        });

        // Re-bind scroll events
        persistentInstance.$('.page-scroll').bind('click', OPW.scrollToHref);

    });

});


/******************************************************************************
 *
 * Navigation item event handlers
 *
 *****************************************************************************/

// Template.opwNavigationItem.events({});


/******************************************************************************
 *
 * Navigation item destroyed handler
 *
 *****************************************************************************/

// Template.opwNavigationItem.onDestroyed({});


/******************************************************************************
 *
 * Navigation item rendered handler
 *
 *****************************************************************************/

// Template.opwNavigationItem.onRendered({});


/******************************************************************************
 *
 * Navigation item event handlers
 *
 *****************************************************************************/

Template.opwNavigationMobile.helpers({

    opwSiteLogo: function () {
        return opw.logoRel;
    },

    opwSiteTitle: function () {
        return opw.title;
    },

});


/******************************************************************************
 *
 * Root (truly global) event handlers
 *
 *****************************************************************************/

Template.opwRoot.events({

    // Global transparent click handler
    'click': function (event, template) {
        // Send GA event
        return;
    },

    // Global transparent stroke handler
    'keypress': function (event, template) {
        // Send GA event
        return;
    },

});


/******************************************************************************
 *
 * Root helpers
 *
 * This retrieves the home row (which is special since it must always appear,
 * must always have #top for the slug and has no title.  It also retrieves
 * all the other rows, separately, for looping in the content.
 *
 *****************************************************************************/

Template.opwRoot.helpers({

    // TODO: It may be faster to move these, or just the home row
    //          to the router.. 
    opwHomeRow: function () {
        return OPW.getHomeRow();
    },

    opwRows: function () {
        return OPW.getRows();
    },

});


/******************************************************************************
 *
 * Root rendered function
 *
 * TODO: This needs to get the client IP from iDM Site Log.
 *
 *****************************************************************************/

Template.opwRoot.onRendered(function () {

    // Remove injected loader div
    $('#opw-loader').remove();

    // Just a check
    if (OPW.ipIsInContacts(Meteor.userIp)) {
        console.log('#OnePageWonder DEBUG User IP is in contact list', 1);
    }

    // iDM Connection Log IP Cheat
    Meteor.setTimeout(function () {
        // Sometimes root renders before injections finish
        var ip = $('meta[name=ip]').attr('content');
        Template.registerHelper('currentIp', function () {
            return ip;
        });
        $('meta[name=ip]').remove();
    }, 500);

    // Meteor.setTimeout(function () {
        // TODO: This is ridiculously slow, try to localize
        // Moved from route onRun 20150624:1515
        // Localized 20150626:0230, check speeds on deployment
        //      and remove this crap if it worked :>
        // idmGA.pageview('/');
    // }, 2500);

});


/******************************************************************************
 *
 * Scrolling indicator events
 *
 * This processes clicks (& taps) on the scroll indicator, when present. Also,
 * handles the OPW brag & social indicators, which should probably be in
 * the layout events.
 *
 *****************************************************************************/

Template.opwScrollIndicator.events({

    /*
     * This is for when I implement a diversified scroll indicator
    'click #opw-scroll-to-first': function (event) {
        console.log('trying next');
        event.preventDefault();
        next = Session.get('opwNextSection');
        OPW.scrollToHref(next);
    },

    'click #opw-scroll-to-last': function (event) {
        console.log('trying next');
        event.preventDefault();
        next = Session.get('opwNextSection');
        OPW.scrollToHref(next);
    },

    'click #opw-scroll-to-prev': function (event) {
        console.log('trying next');
        event.preventDefault();
        next = Session.get('opwNextSection');
        OPW.scrollToHref(next);
    },
    */

    'click #opw-scroll-to-next': function (event) {
        OPW.log('Trying to scroll to next', 1);
        event.preventDefault();
        var state = Session.get('opwScrollState');
        var next  = '#' + state.next;
        OPW.scrollToHref(next);
    },

    'click #opw-scroll-to-top': function (event) {
        OPW.log('Trying to scroll to top', 1);
        event.preventDefault();
        var state = Session.get('opwScrollState');
        var first = '#' + state.first
        OPW.scrollToHref(first);
    },

    'click #opw-brag': function (event) {
        OPW.log('Trying to pop OPW brag box', 1);
        event.preventDefault();
        // TODO: Light box

    },

});


/******************************************************************************
 *
 * Scrolling indicator helpers
 *
 *****************************************************************************/

Template.opwScrollIndicator.helpers({

    opwLastDisplayedSectionIsActive: function () {
        state = Session.get('opwScrollIndicatorState');
        return (OPW.isObject(state)) ? (state.active == state.last) : false;
    },
        
    opwShowFixedScrollIndicator: function () {
        return (opw.navigation.showScrollIndicator && opw.navigation.fixedScrollIndicator);
    },

});


/******************************************************************************
 *
 * Scrolling indicator rendered function
 *
 * Since this is theoretically the last to render, it's a pretty good place
 * to hook up the carousel.  Doing it earlier will either not work (due to
 * data latency (Meteor is delivering the carousel as data not template code)
 * so by time this renders all the sections should also be rendered.
 *
 *****************************************************************************/

// Template.opwScrollIndicator.onRendered(function () {});


/******************************************************************************
 *
 * Section (row) event handlers
 *
 *****************************************************************************/

Template.opwSection.events({

    // Open the editor
    'click .opw-editor-open': function (event, template) {
        event.preventDefault();
        var id = OPW.getIdFromSlug(contentParent.parent().attr('id'));
        OPW.popEditor(id);
    },

});

/******************************************************************************
 *
 * Section (row) helpers
 *
 *****************************************************************************/

Template.opwSection.helpers({

    opwShowSectionalScrollIndicator: function () {
        return (opw.navigation.showScrollIndicator && !opw.navigation.fixedScrollIndicator);
    },

});


/******************************************************************************
 *
 * Section rendered function
 *
 * This renders the contact form into a string and inserts it into the row
 * content.

 *****************************************************************************/

Template.opwSection.onRendered(function () {

    // Locals
    var carouselExists      = (this.$('.carousel').length);
    var contactFormExists   = (this.$('.opw-contact').length);
    var tabPanelExists      = (this.$('.tab-panel').length);

    /** Bootstrap elements **/

    // Assign carousel events
    if (carouselExists) {
        $('.carousel').carousel({interval: 6500});
    }

    // Assign tab panel events
    if (tabPanelExists) {
        this.$('.tab-panel a').click(function (event) {
            event.preventDefault();
            $(this).tab('show'); // Tab panel click context
        });
    }

    /** Contact form **/

    // Make sure just one
    if (1 < contactFormExists) {
        console.log('ERROR There may only be one contact form per editable section');
        return;
    }

    // Dynamically load OPW contact form
    if (contactFormExists) {
        Blaze.render(Template.opwContactForm, this.find('.opw-contact'));
    }

});


/******************************************************************************
 *
 * OPW Social icons helpers
 *
 *****************************************************************************/

Template.opwSocialIcons.events ({

    opwSocialServices: function () {
        if (!opw || !OPW.isObject(opw.social) || !opw.social.keys().length) return;
        var arr = []
        _.each(opw.social, function (value, key) {
            if ('enable' != key) {
                returnArray.push({service: key, link: value});
            }
        });
        return arr;
    },

});


/******************************************************************************
 *
 * OPW WonderBar event handlers
 *
 * This renders component elements from opw-elements.html and
 * inserts them into the textarea.
 *
 *****************************************************************************/

Template.opwWonderBar.events ({

    'click #opw-wonderbar-help': function (event) {
        event.preventDefault();
        event.stopImmediatePropogation();
        OPW.popLightbox({id: 'opw-toolbar-help'});
    },

    'click .opw-wonderbar-btn': function (event) {
        event.preventDefault();
        OPW.insertBootstrapElement($(event.target).attr('id'));
    },

});
