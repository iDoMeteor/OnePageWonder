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
    OPW.popModal({
      id:         'opw-toolbar-help',
      cssId:      'opw-toolbar-help',
      footer:     false,
      label:      OPW.getNestedConfig('wonderBar',
                              'helpTitle'),
      template:   'opwWonderBarHelp',
    });
  },

  'click .opw-wonderbar-btn': function (event) {
    event.preventDefault();
    OPW.log({
      message: 'Attempting to call WonderBar element.',
      type: 'debug',
      data: {id: $(event.target).attr('id')},
    });

    OPW.insertWonderBarElement($(event.target).attr('id'));
  },

  'click .opw-wonderbar-menu-back': function (event) {
    event.preventDefault();
    Session.set('wonderBarState', 'opwWonderBarMenuRoot');
  },

  'click .opw-wonderbar-menu-btn': function (event) {
    event.preventDefault();
    var template = $(event.currentTarget).attr('data-template');
    Session.set('wonderBarState', template);
  },

});


/******************************************************************************
 *
 * OPW WonderBar helpers
 *
 *****************************************************************************/

Template.opwWonderBar.helpers ({

  wonderBarTemplate: function () {
    return Session.get('wonderBarState');
  },

});


/******************************************************************************
 *
 * OPW WonderBar on created routine
 *
 *****************************************************************************/

Template.opwWonderBar.onCreated (function () {

  if (!Session.get('wonderBarState')) {
    Session.set('wonderBarState', 'opwWonderBarMenuRoot');
  }

});
