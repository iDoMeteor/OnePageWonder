/*******************************************************************************
 *
 * Navigation events
 *
 ******************************************************************************/

Template.opwNavigation.events({

    // This hooks BSSS and sets session vars for the scroll indicator
    // One might put other possible activation hooks here
    'activate.bs.scrollspy .nav li': function () {
      var state = {};
      if (
          OPW.getNestedConfig('navigation', 'showScrollIndicator')
          && OPW.getRows().length // Probably could be more efficient here
      ) {
          state = OPW.scrollIndicatorUpdate();
      }
      if (!state.active) {
        state = {active: 'top'};
      }
      // Log section view using slug
      // Note: Doing this here provides the most reasonable assumption that a
      //        user has actually viewed the content, and not just that it has
      //        been rendered by Blaze.
      OPW.logSectionView(state.active);
    },

    // Detailed contact
    'click #opw-contact-detailed': function (event) {

        event.preventDefault();

        if (Meteor.userId()) {

            // Must be admin, since OPW is a single user system atm
            OPW.popModal({
                id:         'opw-contact-log',
                cssId:      'opw-contact-log',
                footer:     false,
                label:      OPW.getConfig('title')
                                + ' '
                                + OPW.getNestedConfig('contact',
                                                      'lightboxLogTitle'),
                template:   'opwContactLog',
            });

        } else {

            // Not admin, anonymous
            OPW.popModal({
                actionId:   'opw-detailed-contact-submit',
                actionText:  OPW.getNestedConfig('contact',
                                                 'btnStringDetailed'),
                id:         'opw-detailed-contact-modal',
                closeText:  OPW.getString('cancelLabel'),
                cssId:      'opw-detailed-contact-modal',
                label:      OPW.getConfig('title')
                                + ' '
                                + OPW.getNestedConfig('contact',
                                                      'lightboxTitle'),
                template:   'opwContactModalForm',
            });

        }

    },

    // Switch navigation styles
    'click #opw-brush': function (event, template) {
        event.preventDefault();
    },

    // XXX
    'click #opw-magic': function (event, template) {
        event.preventDefault();
    },

    // Instantiate the new content editor
    'click #opw-launch-editor': function (event, template) {
        event.preventDefault();
        active = Session.get('opwActiveEditorTemplate')
                  || 'opwEditorDashboard';
        OPW.popModalEditor({
            cssId:      'opw-editor',
            footer:     true,
            id:         'opw-editor',
            template:   active,
        });
    },

    // Expose authentication section
    'click #opw-login': function (event) {
        event.preventDefault();
        OPW.popModal({
            id:         'opw-authenticate',
            cssId:      'opw-authenticate',
            footer:     false,
            label:      OPW.getConfig('title')
                            + ' '
                            + OPW.getString('authenticationLighboxTitle'),
            template:   'opwAuthenticate',
        });
    },

    // Logout
    'click #opw-logout': function (event) {
        event.preventDefault();
        Meteor.logout(function (error) {
            if (error) {
                OPW.log({
                  message: OPW.getString('authenticationLogoutFailure'),
                  type: 'error',
                  notifyAdmin: true,
                  notifyUser: true,
                  auth: true,
                  security: true,
                });
            } else {
                OPW.log({
                  message: OPW.getString('authenticationLogoutSuccess'),
                  type: 'success',
                  notifyUser: true,
                  auth: true,
                });
            }
        });
    },


});


/*******************************************************************************
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
 ******************************************************************************/

Template.opwNavigation.helpers({

    opwAllowDynamicNavigation: function () {
        return (OPW.getNestedConfig('navigation', 'allowDynamicNavigation'));
    },

    opwAllowDynamicTheme: function () {
        return (OPW.getNestedConfig('navigation', 'allowDynamicTheme'));
    },

    opwCollapseNavbar: function () {
        if (OPW.getNestedConfig('navigation', 'collapse')) {
            return 'collapse navbar-collapse';
        }
    },

    opwIfNavbarIsFixed: function () {
        if (OPW.getNestedConfig('navigation', 'fixed')) {
            return ' navbar-fixed-top';
        }
    },

    opwIfNavbarIsFluid: function () {
        if (OPW.getNestedConfig('navigation', 'fluid')) {
            return '-fluid';
        }
    },

    opwNavbarClasses: function () {
        var classes = 'nav navbar-nav';
        var style   = OPW.getNestedConfig('navigation', 'style');
        if ('MeteorPress' == style)
            classes += ' nav-meteorpress';
        else if ('Stacked' == style)
            classes += ' nav-stacked';
        else if ('Scrolling' == style)
            classes += ' nav-scrolling';
        return classes;
    },

    opwNavbarContextualClass: function () {
        var context = OPW.getNestedConfig('navigation', 'contextClass');
        return (context) ? ' navbar-' + context : '';
    },

    // Get non-stale, non-removed, non-top-slug-having rows..
    opwRows: function () {
        return OPW.getRows();
    },

    opwShowDetailedContactLink: function () {
        return (
          !Meteor.user()
          && OPW.getNestedConfig('contact', 'showDetailed')
        );
    },

});


/*******************************************************************************
 *
 * Navigation rendered function
 *
 * This sets up the session properties for the scroll indicator, reactively
 * re-binds the scroll events when the navigation list content changes, and
 * corrects the scroll indicator session properties in the same fashion.
 *
 ******************************************************************************/

Template.opwNavigation.onRendered(function () {

    // Locals
    var persistentInstance = this;

    persistentInstance.autorun(function (computation) {

        // Don't hang around if we're not needed
        if (OPW.noRowsExist()) {
            OPW.log({message: 'No rows to process for this instance',
                    type: 'debug'});
            return;
        }

        if (OPW.getNestedConfig('navigation', 'showScrollIndicator')) {
            state = OPW.scrollIndicatorUpdate();
        }

        // Re-bind scroll events
        $('[data-spy="scroll"]').each(function () {
            $(this).scrollspy('refresh');
        });

        // Re-bind scroll events
        persistentInstance.$('.page-scroll').bind('click', OPW.scrollToHref);

    });

});


/*******************************************************************************
 *
 * Navigation item event handlers
 *
 ******************************************************************************/

Template.opwNavigationMobile.helpers({

    opwSiteLogoNavigation: function () {
        return opw.logoNavigationRel;
    },

    opwSiteTitle: function () {
        return opw.title;
    },

});
