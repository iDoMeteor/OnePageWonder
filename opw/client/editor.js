/*******************************************************************************
 *
 * OPW Editor event handlers
 *
 ******************************************************************************/

Template.opwEditorDashboard.events({


});


/*******************************************************************************
 *
 * OPW Editor helpers
 *
 ******************************************************************************/

Template.opwEditorDashboard.helpers({


});


/*******************************************************************************
 *
 * OPW Editor Admin Notification Log created routine
 *
 ******************************************************************************/

Template.opwEditorDashboard.onCreated(function () {

  this.subscribe('opwAdminNotificationLog');

});


/*******************************************************************************
 *
 * OPW Editor sections rendered handler
 *
 ******************************************************************************/

Template.opwEditorDashboard.onRendered(function () {


});


/*******************************************************************************
 *
 * OPW Editor Configuration event handlers
 *
 ******************************************************************************/

Template.opwEditorConfiguration.events({

  // XXX
  'click #opw-editor-config-lock': function (event) {

    event.preventDefault();


    // TODO: Confirm with user

    OPW.XXX($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-config-save': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.XXX($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-config-unlock': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.XXX($(event.target).attr('id'));
    Router.go('/');

  },

});


/*******************************************************************************
 *
 * OPW Editor Configuration helpers
 *
 ******************************************************************************/

Template.opwEditorConfiguration.helpers({

  config: function () {

    return;

  },

});


/*******************************************************************************
 *
 * OPW Editor Admin Notification Log helpers
 *
 ******************************************************************************/

Template.opwEditorLogAdmin.helpers({

  log: function () {

    return OPW.getAdminNotificationLog();

  },

});


/*******************************************************************************
 *
 * OPW Editor Admin Notification Log created routine
 *
 ******************************************************************************/

Template.opwEditorLogAdmin.onCreated(function () {

  this.subscribe('opwAdminNotificationLog');

});


/*******************************************************************************
 *
 * OPW Editor Authentication Log helpers
 *
 ******************************************************************************/

Template.opwEditorLogAuthentication.helpers({

  log: function () {

    return OPW.getAuthenticationHistory();

  },

});


/*******************************************************************************
 *
 * OPW Editor Authentication Log created routine
 *
 ******************************************************************************/

Template.opwEditorLogAuthentication.onCreated(function () {

  this.subscribe('opwAuthenticationHistory');

});


/******************************************************************************
 *
 * Contact log helpers
 *
 *****************************************************************************/

Template.opwEditorLogAdmin.events({

  'click .opw-detail-toggle': function (event) {

    event.preventDefault();
    $(event.target).closest('tr').next().toggleClass('hidden');

  },

  'click .opw-log-viewed': function (event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id')
           || $(event.currentTarget).attr('data-id');
    opwAdminNotificationLog.update({_id: id}, {$set: {
      read: true,
    }});
  },

});


/******************************************************************************
 *
 * Contact log helpers
 *
 *****************************************************************************/

Template.opwEditorLogAuthentication.events({

  'click .opw-detail-toggle': function (event) {

    event.preventDefault();
    $(event.target).closest('tr').next().toggleClass('hidden');

  },

  'click .opw-log-viewed': function (event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id')
           || $(event.currentTarget).attr('data-id');
    opwLog.update({_id: id}, {$set: {
      read: true,
    }});
  },

});


/******************************************************************************
 *
 * Contact raw log helpers
 *
 *****************************************************************************/

Template.opwEditorLogRaw.events({

  'click .opw-detail-toggle': function (event) {

    event.preventDefault();
    $(event.target).closest('tr').next().toggleClass('hidden');

  },

});


/******************************************************************************
 *
 * Contact log helpers
 *
 *****************************************************************************/

Template.opwEditorLogSecurity.events({

  'click .opw-detail-toggle': function (event) {

    event.preventDefault();
    $(event.target).closest('tr').next().toggleClass('hidden');

  },

  'click .opw-log-viewed': function (event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id')
           || $(event.currentTarget).attr('data-id');
    opwLog.update({_id: id}, {$set: {
      read: true,
    }});
  },

});


/******************************************************************************
 *
 * Contact log helpers
 *
 *****************************************************************************/

Template.opwEditorLogContact.events({

    'click tbody': function (event) {
      event.preventDefault();
      var id = $(event.currentTarget).attr('data-id');
      opwContacts.update({_id: id}, {$set: {
        read: true,
      }});
    },

});


/*******************************************************************************
 *
 * OPW Editor Contact Log helpers
 *
 ******************************************************************************/

Template.opwEditorLogContact.helpers({

  log: function () {

    return OPW.getContacts();

  },

});


/*******************************************************************************
 *
 * OPW Editor Admin Notification Log created routine
 *
 ******************************************************************************/

Template.opwEditorLogContact.onCreated(function () {

  this.subscribe('opwContacts');

});


/*******************************************************************************
 *
 * OPW Editor Raw Log helpers
 *
 ******************************************************************************/

Template.opwEditorLogRaw.helpers({

  log: function () {

    return OPW.getRawLog();

  },

});


/*******************************************************************************
 *
 * OPW Editor Raw Log created routine
 *
 ******************************************************************************/

Template.opwEditorLogRaw.onCreated(function () {

  this.subscribe('opwRawLog');

});


/*******************************************************************************
 *
 * OPW Editor Security Log helpers
 *
 ******************************************************************************/

Template.opwEditorLogSecurity.helpers({

  log: function () {

    return OPW.getSecurityLog();

  },

});


/*******************************************************************************
 *
 * OPW Editor Security Log created routine
 *
 ******************************************************************************/

Template.opwEditorLogSecurity.onCreated(function () {

  this.subscribe('opwSecurityLog');

});


/*******************************************************************************
 *
 * OPW Editor Log events
 *
 ******************************************************************************/

Template.opwEditorLogs.events({


  'click #opw-log-admin': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorLogAdmin');

  },

  'click #opw-log-authentication': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorLogAuthentication');

  },

  'click #opw-log-contact': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorLogContact');

  },

  'click #opw-log-raw': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorLogRaw');

  },

  'click #opw-log-security': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorLogSecurity');

  },

});


/*******************************************************************************
 *
 * OPW Editor Log helpers
 *
 ******************************************************************************/

Template.opwEditorLogs.helpers({


  counts: function () {

    return {
      notifications: OPW.getAdminNotificationLog(false).count(),
      authentications: OPW.getAuthenticationHistory(false).count(),
      contacts: OPW.getContacts(false).count(),
      raw: OPW.getRawLog(false).count(),
      security: OPW.getSecurityLog(false).count(),
    };

  },

});


/*******************************************************************************
 *
 * OPW Editor Log on created routine
 *
 ******************************************************************************/

Template.opwEditorLogs.onCreated( function () {

  this.subscribe('opwAdminNotificationLog');
  this.subscribe('opwAuthenticationHistory');
  this.subscribe('opwContacts');
  this.subscribe('opwRawLog');
  this.subscribe('opwSecurityLog');

});


/*******************************************************************************
 *
 * OPW Editor event handlers
 *
 ******************************************************************************/

Template.opwEditorMenu.events({

  'click #opw-edit-dashboard': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorDashboard');

  },

  'click #opw-edit-configuration': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorConfiguration');

  },

  'click #opw-edit-logs': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorLogs');

  },

  'click #opw-edit-new-section': function (event) {

    event.preventDefault();
    Session.set('opwEditRowId', false);
    Session.set('opwActiveEditorTemplate', 'opwEditorRow');

  },

  'click #opw-edit-sections': function (event) {

    event.preventDefault();
    Session.set('opwActiveEditorTemplate', 'opwEditorSections');

  },

});


/*******************************************************************************
 *
 * OPW Editor Menu helpers
 *
 ******************************************************************************/

Template.opwEditorMenu.helpers({

  opwDashboardLabel: function () {
    return OPW.getString('editorDashboardLabel');
  },

  opwConfigurationLabel: function () {
    return OPW.getString('editorConfigurationLabel');
  },

  opwLogsLabel: function () {
    return OPW.getString('editorLogsLabel');
  },

  opwNewSectionLabel: function () {
    return OPW.getString('editorNewSectionLabel');
  },

  opwSectionsLabel: function () {
    return OPW.getString('editorSectionsLabel');
  },

});



/*******************************************************************************
 *
 * OPW Editor section events
 *
 ******************************************************************************/

Template.opwEditorSections.events({

  'click .opw-edit-row': function (event) {

    event.preventDefault();
    var id = $(event.target).parent().attr('data-id');
    var slug = $(event.target).parent().attr('data-slug');
    Session.set('opwActiveEditorTemplate', 'opwEditorRow');
    Session.set('opwEditRowId', id);

  },

  // Trash can handler, soft deletes a row
  'click .opw-trash-row': function (event) {

    event.preventDefault();
    // TODO: Confirm with user
    var id = $(event.target).parent().attr('data-id');
    OPW.removeRow(id);

  },

});

/*******************************************************************************
 *
 * OPW Editor Sections helpers
 *
 ******************************************************************************/

Template.opwEditorSections.helpers({

  opwHomeRow: function () {
    return OPW.getHomeRow();
  },

  opwRows: function () {
    return OPW.getRows();
  },

  sortableOptions: function () {
    return {
      animation: 150,
      handle: '.sortable-handle',
      sortField: 'order',
    };
  },

});


/*******************************************************************************
 *
 * OPW Editor sections rendered handler
 *
 ******************************************************************************/

Template.opwEditorSections.onRendered(function () {


  var list = $('#opw-editor-title-order').get(0);
  var sortable = Sortable.create(list, {
    animation: 150,
    handle: '.sortable-handle',

    onUpdate: function (event) {
      /**
       * Update & save affected records
       * .. while making sure home row is always 0
       */
      var filter    = {
        removed:    {$ne: true},
        slug:       {$ne: 'top'},
        stale:      {$ne: true},
      }
      var newIndex  = event.newIndex;
      var oldIndex  = event.oldIndex;
      var rowId = $(event.item).attr('data-id');

      // Debug
      OPW.log({
        data: {
          newIndex: newIndex,
          oldIndex: oldIndex,
          rowId: rowId,
        },
        message: 'Sortable updating:',
        type: 'debug',
      });

      // Re-order the elements
      OPW.adjustRowOrder(rowId, newIndex, oldIndex, filter);

    },

  });

});


/*******************************************************************************
 *
 * OPW Row Editor helpers
 *
 ******************************************************************************/

Template.opwEditorRow.helpers({

  row: function () {

    var id = Session.get('opwEditRowId');
    return OPW.getRowById(id);

  },

});


/*******************************************************************************
 *
 * OPW Editor Row Title helpers
 *
 ******************************************************************************/

Template.opwEditorRowTitle.helpers({

  opwEditorTitlePlaceholder: function () {
    return 'Section Title';
  },

});


/*******************************************************************************
 *
 * OPW Modal Editor event handlers
 *
 ******************************************************************************/

Template.opwModalEditor.events({

  // Save
  'click #opw-editor-section-save': function (event) {

    event.preventDefault();
    // TODO: Make isTop a perm property so can change home row w/ button

    var current = null;
    var id = OPW.isCollectionId(Session.get('opwEditRowId'))
      ? Session.get('opwEditRowId')
      : undefined;
    var obj = {};

    // Formulate parameter object
    if (id) {
      current = OPW.getRowById(id);
    }
    // The props are not required for insert
    if (current) {
      obj.isTop    = ('top' == current.slug) ? true : false;
      obj.order    = (OPW.isNumber(current.order))
                      ? current.order
                      : 1;
      obj.previous = id; // id is obviously valid now
    }
    // The props are required for insert
    obj.title = $('#opw-title-editor').val();
    obj.content = $('#opw-editor-textarea').val();
    if (obj.isTop) {
      obj.slug = current.slug;
    } else {
      obj.slug = OPW.stringToSlug(obj.title);
    }

    // Validate before sending to server
    if (!obj.isTop && !OPW.isValidTitle(obj.title)) {
      OPW.flashBG('#opw-title-editor');
      OPW.log ({
        message: 'You must enter a valid title for non-top rows.',
        type: 'danger',
        notifyUser: true,
        data: obj,
      });
      $('#opw-editor-title').focus();
      return;
    }
    if (!OPW.isValidContent(obj.content)) {
      OPW.flashBG('#opw-editor-textarea');
      OPW.log ({
        message: 'You must enter valid content before saving.',
        type: 'danger',
        notifyUser: true,
        data: obj,
      });
      $('#opw-editor-textarea').focus();
      return;
    }

    // Debug
    OPW.log ({
      message: 'Row object prior to insertion attempt:',
      type: 'debug',
      data: obj,
    });

    // Insert
    OPW.insertRow(obj, function insertRowEventCallback (error, result) {

      if (result) {
        // If success
        OPW.log ({
          message: 'Saved row.',
          type: 'Success',
          notifyUser: true,
          data: obj,
        });
        // Expire previous version if there was one
        if (obj.previous) {
          OPW.expireRow(obj.previous);
        }
        // Assign scroll event to new thingy
        $('[href=' + obj.slug + ']').addClass('page-scroll');
        $('[href=' + obj.slug + ']').bind('click', OPW.scrollToHref);
        // Scroll to it
        // If the DB read doesn't occur quick enough,
        // this will fail... should Metoerize it.. :)
        $('html, body').stop().animate({
          scrollTop: $('#' + obj.slug).offset().top
        }, 1500, 'easeInOutExpo');
        // Refresh scroll spy
        $('body').scrollspy('refresh');

        // TODO: Reset form

      } else {
        // Failure
        OPW.log ({
          message: 'Failed to save row.',
          type: 'error',
          notifyUser: true,
          data: obj,
        });
        return;
      }

      return;

    }); // End insertRowCallback

  },

});


/*******************************************************************************
 *
 * OPW Modal Editor helpers
 *
 ******************************************************************************/

Template.opwModalEditor.helpers({

  actionId: function () {

    if ('opwEditorRow' == Session.get('opwActiveEditorTemplate')) {
      return 'opw-editor-section-save';
    }

    return;
  },

  actionText: function () {

    if ('opwEditorRow' == Session.get('opwActiveEditorTemplate')) {
      return 'Save Section';
    }

    return;
  },

  closeLabel: function () {
    return OPW.getString('closeLabel');
  },

  template: function () {
    return Session.get('opwActiveEditorTemplate') || 'opwEditorDashboard';
  },

});


/*******************************************************************************
 *
 * OPW Modal Editor rendered handler
 *
 ******************************************************************************/

Template.opwModalEditor.onRendered(function () {

    var target = this.find('.modal');
    $(target).modal('show');
    $(target).on('hidden.bs.modal', function () {
        $(target).remove();
    });

});

