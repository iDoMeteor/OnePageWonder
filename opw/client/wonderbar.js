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
        // Not sure why I needed this, but I doubt I do anymore
        // event.stopImmediatePropogation();
        OPW.popModal({id: 'opw-toolbar-help'});
    },

    'click .opw-wonderbar-btn': function (event) {
        event.preventDefault();
        OPW.insertBootstrapElement($(event.target).attr('id'));
    },

});
