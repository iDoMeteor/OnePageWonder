/******************************************************************************
 *
 * Contact form event handlers
 *
 *****************************************************************************/

Template.opwContactForm.events({

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
                idmGA.event('Contact Request', 'Submitted', val);
                return; // Post-processing handled in above
            }

        } else {

            // Set invalid flag
            OPW.contactFormInvalid(template);

            // Pop alert if they tried to submit anyway
            if (submit) {
                OPW.popAlert('You must enter a valid twitter handle or email.',
                             'danger');
                idmGA.event('Contact Request', 'Invalid Submission', val);
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
                contact: (contact.email)
                    ? contact.email
                    : (contact.twitter)
                        ? contact.twitter
                        : 'N/A',
                date: (contact.stamp)
                    ? contact.stamp
                    : 'N/A',
                label: (contact.label)
                    ? contact.label
                    : 'N/A',
                phone: (contact.phone)
                    ? contact.phone
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
            normalized[0] = {contact: 'No contacts yet! Get tweeting!'};
        }

        return normalized;

    },

});


/******************************************************************************
 *
 * Contact form event handlers
 *
 *****************************************************************************/

Template.opwContactModalForm.events({

    // Validate and potentially submit detailed contact form
    'click #opw-detailed-contact-submit': function (event, template) {

        event.preventDefault();

        // Locals
        var message = $(template.find('#opw-contact-tore')).val();
        var obj     = {};
        var phone   = $(template.find('#opw-contact-pors')).val();
        var tOrE    = $(template.find('#opw-contact-message')).val();
        var valid   = false;
        tOrE        = tOrE.trim();
        pOrS        = phone.trim();
        message     = message.trim();

        // Formulate
        obj.tore    = tOrE;
        obj.pOrS    = pOrS ;
        obj.message = message;

        // TODO
        // Validate
        if (OPW.isValidContactDetailed(obj)) {
            OPW.contactDetailedFormValid(template);
            valid = true;
        } else {
            OPW.contactDetailedFormInvalid(template);
        }

        // Post processing handled in API
        (valid)
            // Pop alert
            ? OPW.insertContactDetailed(obj, template)
            : OPW.log({
                    message: OPW.getNestedConfig('contact',
                                              'detailedFormInvalidSubmission'),
                    type: 'danger',
                    notifyUser: true,
                    sendEvent: true,
                });

        return;

    },

    // Validate contact field as they type
    'keyup .opw-contact-input': function (event, template) {

        // Locals
        var val     = $(template.find('.opw-contact-input')).val();
        val         = val.trim();

        // Reset if empty
        if (!val.length) {
            OPW.contactFormReset(template);
            return;
        }

        // Validate
        if (OPW.isValidContact(val)) {

            // Set valid flag
            OPW.contactFormValid(template);

        } else {

            // Set invalid flag
            OPW.contactFormInvalid(template);

        }

        return;

    },

    // Validate message field as they type
    'keyup #opw-detailed-contact-message': function (event, template) {

        // Locals
        var val     = $(template.find('#opw-detailed-contact-message')).val();
        val         = val.trim();

        // Reset if empty
        if (!val.length) {
            OPW.contactFormMessageReset(template);
            return;
        }

        // Validate
        if (OPW.isValidContactMessage(val)) {

            // Set valid flag
            OPW.contactFormValidMessage(template);

        } else {

            // Set invalid flag
            OPW.contactFormInvalidMessage(template);

        }

        return;

    },

    // Validate phone or subject field as they type
    'keyup .opw-contact-pors': function (event, template) {

        // Locals
        var val     = $(template.find('.opw-contact-pors')).val();
        val         = val.trim();

        // Reset if empty
        if (!val.length) {
            OPW.contactFormSubjectReset(template);
            return;
        }

        // Validate
        if (OPW.isValidContactSubject(val)) {

            // Set valid flag
            OPW.contactFormValidSubject(template);

        } else {

            // Set invalid flag
            OPW.contactFormInvalidSubject(template);

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
