console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor');
/*******************************************************************************
 *
 * #OnePageWonder by @iDoMeteor
 * v1.0.0-RC.2
 *
 ******************************************************************************/

/*******************************************************************************
 *
 * OPW authentication hooks
 *
 * Logs all login attempts, sending authentication success message to the user.
 *
 * Caveat: User failure messages are handled in API login methods so that each
 * authentication method can set service specific error messages.
 *
 ******************************************************************************/

Accounts.onLogin(function (user) {

  // This runs all the time, DDP auth!

});

Accounts.onLoginFailure(function (user) {

  // This runs all the time, DDP auth!

});


/*******************************************************************************
 *
 * OPW alert rendered handler
 *
 ******************************************************************************/

Template.opwAlert.onRendered(function () {

    var duration = this.data.duration || 5000;
    var target = this.find('.alert');
    Meteor.setTimeout(function () {
        $(target).hide('fade', function () {
            $(target).alert('close');
        });
    }, duration);

});


/*******************************************************************************
 *
 * OPW alert helpers
 *
 ******************************************************************************/

Template.opwAlert.helpers({

    closeLabel: function () {
        return OPW.getString('closeLabel');
    },

});


/*******************************************************************************
 *
 * Authentication form event handlers
 *
 ******************************************************************************/

Template.opwAuthenticate.events ({

    // Cancel authentication request, clear inputs & hide auth section
    'click #opw-auth-cancel': function (event) {
        event.preventDefault();
        $('#opw-auth-email').val('');
        $('#opw-auth-password').val('');
        $('#opw-authenticate').modal('hide');
        // Send event to analytics
        OPW.log({
            message: OPW.getString('authenticationCancelled'),
            sendEvent: true,
            type: 'info',
        });
    },

    // Create admin user
    'click #opw-auth-email-create': function (event) {
        event.preventDefault();
        var options      = {};
        options.email    = $('#opw-auth-email').val();
        options.name     = OPW.getString('adminName');
        options.password = $('#opw-auth-password').val();
        options.username = OPW.getString('adminUsername');
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


/*******************************************************************************
 *
 * Authentication helpers
 *
 ******************************************************************************/

Template.opwAuthenticate.helpers({

    opwAuthHeading: function () {
        return OPW.getString('authenticationHeading');
    },

    opwAuthTagline: function () {
        return OPW.getString('authenticationTagline');
    },

    opwCancelPrompt: function () {
        return OPW.getString('cancelLabel');
    },

    opwCreateAccountPrompt: function () {
        return OPW.getString('authenticationButtonCreateAccount');
    },

    opwEmailLabel: function () {
        return OPW.getString('emailLabel');
    },

    opwLoadingText: function () {
        return OPW.getString('loadingText');
    },

    opwLoginPrompt: function () {
        return OPW.getString('authenticationButtonLogin');
    },

    opwPasswordLabel: function () {
        return OPW.getString('passwordLabel');
    },

    opwShowLogin: function () {
        return OPW.countUsers();
    },

    opwUserIpLabel: function () {
        return OPW.getString('userIpLabel');
    },

});


/*******************************************************************************
 *
 * Authentication setup on creation
 *
 ******************************************************************************/

Template.opwAuthenticate.onCreated(function () {

    // Only time we need it really
    this.subscribe('opwUsers');

});


/*******************************************************************************
 *
 * Footer event handlers
 *
 ******************************************************************************/

Template.opwFooter.events ({

    'click #opw-brag': function (event) {
        event.preventDefault();
        // Show info
        OPW.popModal({
            id:         'opw-brag-box',
            cssId:      'opw-brag-box',
            footer:     true,
            label:      OPW.version(),
            template:   'opw',
        });
    },

    'click .opw-site-stats': function (event) {
        event.preventDefault();
        // Show info
        OPW.popModal({
            id:         'opw-site-stats',
            cssId:      'opw-site-stats',
            footer:     true,
            label:      OPW.getSiteTitle()
                        + ' '
                        + OPW.getString('siteStatsLabel'),
            template:   'opwSiteStatistics',
        });
    },

});


/*******************************************************************************
 *
 * Footer helpers
 *
 * TODO:
 *    Upgrade to OPW interface
 *
 ******************************************************************************/

Template.opwFooter.helpers ({

    opwFixedFooter: function () {
        return (opw.footer.fixed);
    },

    opwFixedScrollIndicator: function () {
        return (opw.navigation.fixedScrollIndicator);
    },

    opwShowSocialIcons: function () {
        return opw.social.enable;
    },

});


/*******************************************************************************
 *
 * Layout event handlers
 *
 * Currently just handles the home link and brag link
 *
 ******************************************************************************/

Template.opwHelp.events ({

    'click a': function (event) {
        event.preventDefault();
    },

});


/*******************************************************************************
 *
 * Layout event handlers
 *
 ******************************************************************************/

Template.opwLayout.events ({

    'click .opw-root': function (event) {
        event.preventDefault();
        // Go home
        OPW.scrollToHref('#top', function () {
            Router.go('opwRoot');
        });
    },

});


/*******************************************************************************
 *
 * Layout (seemingly global) helpers
 *
 * This currently tells the scroll indicator how to act
 *
 * TODO:
 *    Upgrade to OPW interface
 *
 ******************************************************************************/

Template.opwLayout.helpers({

    opwFixedScrollIndicator: function () {
        return (opw.toggles.fixedScrollIndicator) ? true : false;
    },

    opwIfFooterIsFluid: function () {
        return (opw.footer.fluid) ? '-fluid' : '';
    },

    opwIfSectionsAreFluid: function () {
        return (opw.layout.fluid) ? '-fluid' : '';
    },

    opwShowFooter: function () {
        return (opw.footer.show);
    },

});


/*******************************************************************************
 *
 * Layout rendered function
 *
 ******************************************************************************/

Template.opwLayout.onRendered(function () {

    // *poof* Pimp glitter falls all around you.
    OPW.instantiateNavigation();

});


/*******************************************************************************
 *
 * OPW Lightbox helpers
 *
 ******************************************************************************/

Template.opwModal.helpers({

    closeLabel: function () {
        return OPW.getString('closeLabel');
    },

});


/*******************************************************************************
 *
 * OPW Lightbox rendered handler
 *
 ******************************************************************************/

Template.opwModal.onRendered(function () {

    var target = this.find('.modal');
    $(target).modal('show');
    $(target).on('hidden.bs.modal', function () {
        $(target).remove();
    });

});


/*******************************************************************************
 *
 * Root helpers
 *
 * This retrieves the home row (which is special since it must always appear,
 * must always have #top for the slug and has no title.  It also retrieves
 * all the other rows, separately, for looping in the content.
 *
 ******************************************************************************/

Template.opwRoot.helpers({

    opwHomeRow: function () {
        return OPW.getHomeRow();
    },

    opwRows: function () {
        return OPW.getRows();
    },

    opwSiteTitle: function () {
        return OPW.getSiteTitle();
    },

});


/*******************************************************************************
 *
 * Root rendered function
 *
 ******************************************************************************/

Template.opwRoot.onRendered(function () {

    // Remove injected loader div
    $('#opw-loader').remove();

});


/*******************************************************************************
 *
 * Section helpers

 ******************************************************************************/

Template.opwSection.helpers({

    opwSectionalIndicator: function () {
        return (!opw.footer.fixedScrollIndicator);
    },

});


/*******************************************************************************
 *
 * Section rendered function
 *
 * This renders the contact form into a string and inserts it into the row
 * content.

 ******************************************************************************/

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

    // Make sure just one per section
    if (1 < contactFormExists) {
        console.log('ERROR There may only be one contact form per editable section');
        return;
    }

    // Dynamically load OPW contact form
    if (contactFormExists) {
        Blaze.render(Template.opwContactForm, this.find('.opw-contact'));
    }

});


/*******************************************************************************
 *
 * OPW Social icons helpers
 *
 ******************************************************************************/

Template.opwSocialIcons.helpers ({

    opwSocialServices: function () {

        // Validate
        if (!OPW.getNestedConfig('social', 'enable')) {
            OPW.log({message: 'Social icons are disabled',
                   type: 'debug'});
            return;
        }

        var arr = []
        _.each(OPW.getConfig('social'), function (value, key) {
            if ('enable' != key) {
                arr.push({service: key, link: value});
            }
        });
        return arr;
    },

});

/*******************************************************************************
 *
 * Global Code
 *
 * Runs when main.js is loaded
 *
 ******************************************************************************/

// Hook into Astronomer global, added just for me! :D
if (OPW.getNestedConfig('astronomer', 'enable')) {
    window.AstronomerConfig = OPW.getConfig('astronomer');
}

// iDM Connection Log IP Cheat
// TODO: This may be slightly broken
(function idmIpCheat(x) {
    var x = x * 2 || 100;
    if (1600 < x) {
        OPW.log({
            message: 'IP helper failed',
            notifyUser: false,
            type: 'failure'
        });
        return;
    }
    Meteor.setTimeout(function () {
        // Sometimes root renders before injections finish
        var ip = $('meta[name=ip]').attr('content');
        if (ip && ip.length) {
            OPW.log({
                message: 'Registering IP helper',
                data: {ip: ip},
                type: 'debug'
            });
            Template.registerHelper('currentIp', function () {
                // This is static, obviously
                return ip;
            });
            $('meta[name=ip]').remove();
        } else {
            OPW.log({
                message: 'Waiting for IP helper',
                type: 'debug'
            });
            idmIpCheat(x);
        }
    }, x);
})(); // i<3Meteor
