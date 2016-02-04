/******************************************************************************
 *
 * Contact form event handlers
 *
 *****************************************************************************/

Template.opwContactForm.events({

    // Validate and potentially submit contact form
    'click .opw-contact-submit, keyup .opw-contact-input': function (event, template) {

        // Locals


        var label = $(template.find('form'))
                      .closest('.opw-contact')
                      .attr('id')
                    || 'opw-contact-request';
        var submission  = {};
        var submit  = (
            (OPW.pressedEnter(event))
            || ('click' == event.type)
        ) ? true : false;
        var user     = $(template.find('.opw-contact-input')).val();
        user         = user.trim();

        if (submit) event.preventDefault();

        // Reset if empty
        if (!user.length) {
            OPW.flagReset(template, '.opw-contact-flag');
            return;
        }

        // Validate
        if (OPW.isValidEmailOrTwitter(user)) {

            // Set valid flag
            OPW.flagValid(template, '.opw-contact-flag');

            // Check for enter
            if (submit) {
              // Formulate object
              submission.label = label;
              submission.user = user;
              // Post processing handled in API
              OPW.insertContact(submission, template);
              return;
            }

        } else {

            // Set invalid flag
            OPW.flagInvalid(template, '.opw-contact-flag');

            // Pop alert if they tried to submit anyway
            if (submit) {
                OPW.popAlert('You must enter a valid twitter handle or email.',
                             'danger');
                idmGA.event('Contact Request', 'Invalid Submission', user);
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
        return OPW.getNestedConfig('contact', 'btnString');
    },

});


/******************************************************************************
 *
 * Contact log helpers
 *
 *****************************************************************************/

Template.opwContactLog.helpers({

    opwContacts: function () {
        var contacts    = OPW.getContacts();
        var normalized  = [];

        _.each(contacts, function(contact) {
            normalized.push({
                user: (contact.user)
                    ? contact.user
                    : 'N/A',
                date: (contact.stamp)
                    ? contact.stamp
                    : 'N/A',
                label: (contact.label)
                    ? contact.label
                    : 'N/A',
                message: (contact.message)
                    ? contact.message
                    : false,
                source: (contact.source)
                    ? contact.source
                    : 'N/A',
            })
        });

        if (!normalized.length) {
            normalized[0] = {contact: 'No contacts yet, get tweeting!'};
        }

        return normalized;

    },

});


/******************************************************************************
 *
 * Modal form event handler to submit contact modal
 *
 *****************************************************************************/

Template.opwModal.events({

    // Validate and potentially submit detailed contact form
    'click #opw-detailed-contact-submit': function (event, template) {

        event.preventDefault();

        // Locals
        // #opw-contact-modal
        var label   = $('#opw-contact-modal').find('#opw-contact-label').val();
        var message = $('#opw-contact-modal').find('#opw-contact-message').val();
        var obj     = {};
        var user    = $('#opw-contact-modal').find('#opw-contact-user').val();
        var valid   = false;

        // Formulate
        obj.label   = label.trim();
        obj.message = message.trim();
        obj.user    = user.trim();

        // Validate
        if (OPW.isValidContactSubmission(obj)) {
          // Post processing handled in API
          OPW.insertContact(obj, template)
        } else {
          // Pop alert
          OPW.log({
            message: OPW.getNestedConfig('contact',
                                         'detailedFormInvalidSubmission'),
                                         type: 'danger',
                                         notifyUser: true,
                                         sendEvent: true,
          });
        }

        return;

    },

});

/******************************************************************************
 *
 * Contact form event handlers
 *
 *****************************************************************************/

Template.opwContactModalForm.events({

    // Validate email/twitter field as they type
    'keyup #opw-contact-user': function (event, template) {

        // Locals
        var val     = $(template.find('#opw-contact-user')).val();
        val         = val.trim();

        // Reset if empty
        if (!val.length) {
            OPW.flagReset(template, '.opw-contact-flag');
            return;
        }

        // Validate
        if (OPW.isValidEmailOrTwitter(val)) {

            // Set valid flag
            OPW.flagValid(template, '.opw-contact-flag');

        } else {

            // Set invalid flag
            OPW.flagInvalid(template, '.opw-contact-flag');

        }

        return;

    },

    // Validate message field as they type
    'keyup #opw-contact-message': function (event, template) {

        // Locals
        var val     = $(template.find('#opw-contact-message')).val();
        val         = val.trim();

        // Reset if empty
        if (!val.length) {
            // Set invalid flag
            OPW.flagInvalid(template, '.opw-contact-message-flag');
        } else {
            // Set valid flag
            OPW.flagValid(template, '.opw-contact-message-flag');
        }

        return;

    },

    // Validate phone or subject field as they type
    'keyup #opw-contact-label': function (event, template) {

        // Locals
        var val     = $(template.find('#opw-contact-label')).val();
        val         = val.trim();

        // Reset if empty or more than 40 characters in length
        if (!val.length || (40 < val.length)) {
            // Set invalid flag
            OPW.flagInvalid(template, '.opw-contact-subject-flag');
        } else {
            // Set valid flag
            OPW.flagValid(template, '.opw-contact-subject-flag');
        }

        return;

    },

});


/******************************************************************************
 *
 * Contact form helpers
 *
 *****************************************************************************/

Template.opwContactModalForm.helpers({

    contactButtonString: function () {
        return OPW.getNestedConfig('contact', 'btnStringDetailed');
    },

});


/******************************************************************************
 *
 * Contact thank you helpers
 *
 *****************************************************************************/

Template.opwContactThankYou.helpers({

    opwContactThankYouText: function () {
        return opw.contact.thankYouText;
    },

});
