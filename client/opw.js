/***
 *
 * TODO: Bring docs up to my usual high standards
 *
 */

Accounts.onLogin(function (user) {
    Router.go('/');
});

/*
UI.registerHelper('currentUserIp', function () {
    console.log(idmCL.getIp(idmCO));
    return OPW.getUserIp();
});
*/

/*
Template.mpAuthenticate.created(function () {

    if (MP.user()) {
        // Set message
        // Go back to where you came from
    }

});
*/

Template.opwAuthenticate.events ({

    // TODO: Password reset? Just Meteor.users.remove({}) from the shell! :)


    'click #opw-auth-cancel': function (event) {
        $('#opw-auth-email').val('');
        $('#opw-auth-password').val('');
        $('#opw-login-section').hide('drop', {direction: 'down'});
    },

    'click #opw-auth-email-create': function (event) {

        event.preventDefault();
        
        // Locals
        var options      = {};
        options.email    = $('[name=email]').val();
        options.name     = 'Admin';
        options.password = $('[name=password]').val();
        options.username = 'Admin';

        // Create new user
        Accounts.createUser(options, function (error) {
            if (error) {
                // Failure
                console.log('#OnePageWonder ERROR Failed to create new user: ' + error);
                console.log('#OnePageWonder ERROR This most likely means the one and only user allowed has already been created.  If you are locked out, issue Meteor.users.remove({}) on the server and then create a new user.');
                // TODO: Set alert

                return false;
            } else {
                // Success
                $('[name=email]').val(''),
                $('[name=password]').val(''),
                $('#opw-login-section').hide('drop', {direction: 'down'}),
                console.log('#OnePageWonder ERROR Failed to create new user: ' + error);
                // TODO: Set welcome alert

                // Go home
                Router.go('/');
                return true;

            }

        });

    },

    'click #opw-auth-email-login': function (event) {

        event.preventDefault();
        var email    = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword (email, password, function (error) {
            return (error) ? (
                console.log('#OnePageWonder ERROR Cannot login: ' + error, 2),
                false
            ) : (
                $('[name=email]').val(''),
                $('[name=password]').val(''),
                $('#opw-login-section').hide('drop', {direction: 'down'}),
                Router.go('/'), 
                true
            )
        });
    },

    'keypress #opw-auth-password': function (event) {

        var email    = $('[name=email]').val();
        var key      = event.which; // TODO: Alter API (notes there)
        var password = $('[name=password]').val();

        if (!OPW.pressedEnter(event)) {
            return ;
        }

        Meteor.loginWithPassword (email, password, function (error) {
            return (error) ? (
                console.log('#OnePageWonder ERROR Cannot login: ' + error, 2),
                false
            ) : (
                $('[name=email]').val(''),
                $('[name=password]').val(''),
                $('#opw-login-section').hide('drop', {direction: 'down'}),
                Router.go('/'), 
                true
            )
        });
    },

});

Template.opwAuthenticate.onRendered (function () {

    // Hide authentication form
    $('#opw-login-section').hide();

});

Template.opwBootstrapBar.events ({

    // TODO: These could probably all be methodized..
    'click #opw-bsbar-button': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementButton)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-col-12': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementCol12)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-col-6': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementCol6)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-col-4': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementCol4)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-col-3': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementCol3)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-carousel': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementCarousel)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-jumbotron': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementJumbotron)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-well': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementWell)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-header': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementH1)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-dl': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementDL)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-ol': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementOL)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-ul': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementUL)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-audio': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementAudio)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-image': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementImage)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-video': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementVideo)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-code': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwElementPre)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-all-teh-mana': function (event) {
        event.preventDefault();
        var append = '\n'
            + Blaze.toHTML(Template.opwBootstrapComponents)
            + '\n';
        var target = $(event.target).closest('.container').find('textarea');
        var value = target.val() + append;
        target.val(value);
    },

    'click #opw-bsbar-help': function (event) {
        event.preventDefault();

        // TODO: Show lightbox

    },

});
    
Template.opwLayout.events ({

    'click .opw-root': function (event) {

        event.preventDefault();
        // Pop informative popover
    },

    'click .opw-root': function (event) {

        event.preventDefault();

        // Page scroller
        $('html, body').stop().animate({
            scrollTop: $('#top').offset().top
        }, 1500, 'easeInOutExpo');
        // Change URL after we arrive
        Meteor.setTimeout( function () {
            Router.go('opwRoot');
        }, 1500);
    },

});

Template.opwLayout.helpers({

    // Whether or not to show the scroll to top link on bottom
    showScrollToTop: function () {
        // Should be 1 < but getRows excludes top row
        return (0 < OPW.getRows().length) ? true : false;
    },

});

Template.opwLayout.onRendered(function () {

    // Assign Bootstrap scrollspy events
    $('body').attr('data-spy', 'scroll');
    $('body').css('position', 'relative');
    $('body').attr('data-target', '#opw-navigation');
    $('body').scrollspy({target: '#opw-navigation' });

    // Instantiate ScrollMenu.js
    /*
    OPW.sm();
    var anchors = [
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
        {
            backgroundColor: "#dc767d",
            className: "test",
            label: "ScrollMenu.js",
            onscrollToSection: function (event, data) {
                hoveredOverDOM = this;
                console.log('SM Callback');
                console.log(JSON.stringify('event: ' + event, null, 4));
                console.log(JSON.stringify('data: ' + data, null, 4));
                console.log(JSON.stringify('this: ' + this, null, 4));
            },
            template: '',
        },
    ]
    var template = Blaze.toHTML(Template.opwSM);
    var options = {
        anchorSetup: anchors,
        menuType: 'vertical',
        onscrollToSection: function (event, data) {
            hoveredOverDOM = this;
            console.log('SM Callback');
            console.log(JSON.stringify('event: ' + event, null, 4));
            console.log(JSON.stringify('data: ' + data, null, 4));
            console.log(JSON.stringify('this: ' + this, null, 4));
        },
        sectionClass: 'opw-sm',
        // TODO: This could be a real template & Blaze render it
        template: '<div class="menu-wrap"><div class="menu"><%= label %></div></div>',
    }
    var opwScrollMenu = ScrollMenu(options);
    */

    // Assign page scroll events
    $('.page-scroll').bind('click', OPW.scrollToHref);

    // Collapse navbar header when not at top
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

});

Template.opwNavigation.events({

    // Instantiate the new content editor
    'click #opw-add-row': function (event, template) {

        event.preventDefault();

        // TODO: Obv this inline HTML crap has to go :D
        var inputExists     = ($('#opw-new-nav').length) ? true : false;
        var navInput        = null;
        var rowEditor       = null;
        var textareaExists  = ($('#opw-new-row').length) ? true : false;
        if (inputExists) {
            console.log ('#OnePageWonder ERROR Input already exists');
            OPW.invalidTitle();
            return false;
        }
        if (textareaExists) {
            console.log ('#OnePageWonder ERROR Textarea already exists');
            OPW.invalidContent();
            return false;
        }

        // Insert navbar list item
        UI.render(Template.opwNavigationInput, template.find('ul'));

        // Hide it for now
        $('#opw-new-nav').hide();

        // Insert content section
        UI.render(Template.opwRowEditor, $('body').get(0), $('section').get(0));

        // Hide it for now
        $('#opw-new-section').hide();

        // Adjust height as appropriate
        var height = $('#opw-new-section').innerHeight() - 170;
        $('#opw-new-row').css('height', height + 'px');

        // Assign events
        $('#opw-new-nav').bind('click', OPW.scrollToHref);
        $('#opw-new-nav').bind('keyup', OPW.insertNav);
        $('#opw-new-nav').blur(function (event) {
            OPW.insertNav(event);
        });
        $('#opw-new-section textarea').bind('keydown', OPW.insertRow);

        // Show the newly created inputs
        $('#opw-new-nav').show('drop', {direction: 'down'}, 1000);
        $('#opw-new-section').show('drop', {direction: 'down'}, 1000);

        /** 
         * Caveat: Several ways of doing this, each have pros and cons..
         *          going this route for now
         */
        // Scroll to it
        OPW.scrollToHref('body', function () {
            // Focus
            $('#opw-new-nav').focus();
        });

    },

});

Template.opwNavigation.helpers({

    // Get non-stale, non-removed, non-top-slug-having rows..
    opwRows: function () {
        return OPW.getRows();
    },

});

Template.opwNavigation.onRendered(function () {

    // (Re-)bind scroll events, reactively
    var rows   = opwRows.find({removed: {$not: true}, stale: {$not: true}});
    var handle = rows.observeChanges({
        added: function () {
            // Refresh scroll spy
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).bind('click', OPW.scrollToHref);
            })
            // TODO: Assign contact events if necessary
        },
        changed: function () {
            // Refresh scroll spy
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).bind('click', OPW.scrollToHref);
                var $spy = $(this).scrollspy('refresh')
            })
            // TODO: Assign contact events if necessary
        },
        removed: function () {
            // Refresh scroll spy
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).scrollspy('refresh')
            })
        },
    });

});

Template.opwContactForm.events({

    // Validate and potentially submit contact form
    'click #opw-contact-submit, keyup #opw-contact-input': function (event) {

        event.preventDefault();

        // Locals
        var submit  = (
            (OPW.pressedEnter(event))
            || ('click' == event.type)
        ) ? true : false;
        var val     = $('#opw-contact-input').val();
        val         = val.trim();

        // Reset if empty
        if (!val.length) {
            // Remove valid indicator
            $('#opw-contact-flag').removeClass('fa-flag-checkered text-success');
            // Remove invalid indicator
            $('#opw-contact-flag').removeClass('fa-flag text-danger');
            // Assign default indicator
            $('#opw-contact-flag').addClass('fa-flag-o text-muted');
            return false;
        }

        // Validate
        // TODO: These could each be abstracted
        if (OPW.isValidContact(val)) {

            // Remove default indicator
            $('#opw-contact-flag').removeClass('fa-flag-o text-muted');
            // Remove invalid indicator
            $('#opw-contact-flag').removeClass('fa-flag text-danger');
            // Set valid indicator
            $('#opw-contact-flag').addClass('fa-flag-checkered text-success');

            // Check for enter
            // TODO: or submit click
            if (submit) {
                // Process
                OPW.insertContact(val);
                // Post-processing handled in above
                return false;
            }
            
        } else {
            // Remove default indicator
            $('#opw-contact-flag').removeClass('fa-flag-o text-muted');
            // Remove valid indicator
            $('#opw-contact-flag').removeClass('fa-flag-checkered text-success');
            // Set invalid indicator
            $('#opw-contact-flag').addClass('fa-flag text-danger');
        }

        return false;

    },


});

Template.opwRoot.events({

    'click .opw-remove-row': function (event) {

        event.preventDefault();

        // Locals
        var selector    = {
            removed:    {$not: true},
            slug:       $(event.target).closest('section').attr('id'),
            stale:      {$not: true},
        };
        var id = opwRows.findOne(selector)._id;

        // Do it
        OPW.removeRow(id);
        Router.go('/');

    },

    // TODO: Methodize & use on click .fa-pencil & floppy
    'click .opw-toggle-row-editor': function (event, template) {

        event.preventDefault();

        // Locals
        var id              = null;
        var isLocked        = (
            $(event.target).hasClass('fa-pencil')
            || $(event.target).children('i').hasClass('fa-pencil')
        ) 
            ? true : false;
        var contentParent   = $(event.target).closest('.container');
        var contentElement  = contentParent.find('.opw-row-content');
        var content         = (isLocked)
            ? contentElement.html()
            : contentParent.find('textarea').val();
        var height          = contentParent.parent().innerHeight() - 170;
        var param           = {};
        var slug            = contentParent.parent().attr('id');
        var isTop           = false;
        if ('top' == slug) {
            isTop = true;
        } else {
            var titleElement    = (isLocked)
                ? $('[href="#' + slug + '"]')
                : $('#opw-title-editor');
            var titleParent     = titleElement.parent();
            var title           = (isLocked)
                ? titleElement.text()
                : titleElement.val();
        }

        // Validate
        if (!OPW.isValidContent(content)) {
            console.log('#OnePageWonder WARNING Content should never be empty');
            // Flash textarea
            OPW.invalidContent();
            return false;
        }
        if (
            (!isTop)
            && (!OPW.isValidTitle(title)) 
        ) {
            console.log('#OnePageWonder WARNING Title should always be valid');
            // Flash input
            OPW.invalidTitle();
            return false;
        }

        // Get ID of row being edited
        id = OPW.getIdFromSlug(slug);

        // Determine action to take
        if (isLocked) {

            // Toggle editor icon
            contentParent.find('.fa-pencil').switchClass('fa-pencil', 'fa-floppy-o');

            /* Convert content to textarea */
            // TODO: Swap contact form code with span short code
            //          Remove #opw-contact-form and re-init content value
            // Drop content
            contentElement.hide('drop', {direction: 'down'}, function () {
                // Remove content
                contentElement.remove();
                // Insert row editor
                Blaze.render(Template.opwRowEditor, template.find(contentParent));
                // Adjust height
                contentParent.find('textarea').hide();
                contentParent.find('textarea').css('height', height + 'px');
                // Assign attributes
                contentParent.find('textarea').attr('data-id', id);
                contentParent.find('textarea').attr('id', slug);
                contentParent.find('textarea').val(content);
                // Show textarea
                contentParent.find('textarea').show('drop', {direction: 'down'}, 1000);
            });

            /* Convert title to input */
            if (!isTop) {
                // Drop title
                titleElement.hide('drop', {direction: 'up'}, function () {
                    // Remove title
                    titleElement.remove();
                    // Insert nav editor
                    Blaze.render(Template.opwNavigationEditor, $('#opw-navigation ul').get(0));
                    // Hide input
                    titleParent.find('input').hide();
                    // Set attributes
                    $('#opw-title-editor').attr('href', '#' + slug); 
                    $('#opw-title-editor').val(title);
                    // Show input
                    titleParent.find('input').show('drop', {direction: 'down'});
                });
            }

        } else {

            // Formulate parameter object
            param.id           = id;
            param.content      = content;
            param.target       = event.target;;
            param.isTop        = isTop;

            if (!isTop) {
                param.title     = title;
            }

            // Update
            OPW.updateRow(param);

        }

        return false;

    },

});

Template.opwRoot.helpers({

    opwHomeRow: function () {
        return OPW.getHomeRow();
    },

    opwRows: function () {
        return OPW.getRows();
    },

});

Template.opwRoot.onRendered(function () {

    if (OPW.ipIsInContacts(Meteor.userIp)) {
        console.log('#OnePageWonder INFO User IP is in contact list');
    }

});

Template.opwSection.events({

});

Template.opwSection.onRendered(function () {

    // Locals
    var contactFormExists = (this.$('#opw-contact').length)

    // Dynamically load OPW contact form if there is only one
    if (contactFormExists) {
        // Load contact template
        Blaze.render(Template.opwContactForm, this.find('#opw-contact'));
    }

    return false;

});

Template.opwScrollToTop.events({

    'click .opw-scroll-to-next': function (event) {
        event.preventDefault();
        OPW.scrollToHref('#' + $(event.target).closest('section').next().attr('id'));
    },

    'click #opw-brag': function (event) {
        event.preventDefault();

    },

    // Expose authentication section
    'click #opw-login': function (event) {

        event.preventDefault();
        $('#opw-login-section').show('drop', {direction: 'down'}, function () {
            OPW.scrollToHref('#opw-login-section');
            $('#opw-login-section').find('input').first().focus();
        });

    },

    // Logout and go home
    'click #opw-logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        // TODO: Pop alert
    },

});

Template.opwScrollToTop.onRendered(function () {

    // Assign carousel events
    $('.carousel').carousel({interval: 6500});

    // Locals
    var hasRows         = ($('sections').length) ? true : false;

    (hasRows) ? (
        // Show scroll to top
        $('#opw-scroll-to-top').hide()
    ) : (
        // Hide scroll to next
        $('#opw-scroll-to-next').hide()
    );

    // TODO: SM state when reaching bottom should toggle bla blah

});
