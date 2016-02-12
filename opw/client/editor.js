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
      notifications: opwAdminNotificationLog.find({
        read: {$ne: true}
      }).count(),
      authentications: opwLog.find({
        auth: {$ne: true},
        read: {$ne: true}
      }).count(),
      contacts: opwContacts.find({
        read: {$ne: true}
      }).count(),
      raw: opwLog.find({
        read: {$ne: true}
      }).count(),
      security: opwLog.find({
        security: {$ne: true},
        read: {$ne: true}
      }).count(),
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

    var id = $(event.target).parent().attr('data-id');
    Session.set('opwActiveEditorTemplate', 'opwEditorRow');
    Session.set('opwEditRowId', id);

  },

  'click .opw-trash-row': function (event) {

    var id = $(event.target).parent().attr('data-id');

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

      if (newIndex < oldIndex) {
        // Element moved up in the list.
        // The dropped element has a next sibling for sure.
        OPW.adjustRowOrder(rowId, newIndex, oldIndex, filter);
      } else if (newIndex > oldIndex) {
        // Element moved down in the list.
        // The dropped element has a previous sibling for sure.
        OPW.adjustRowOrder(rowId, newIndex, oldIndex, filter);
      }

    },

  });

});


/*******************************************************************************
 *
 * OPW Row Editor helpers
 *
 ******************************************************************************/

Template.opwEditorRow.helpers({


});


/*******************************************************************************
 *
 * OPW Row Editor event handlers
 *
 ******************************************************************************/

Template.opwEditorRow.events({


});


/*******************************************************************************
 *
 * OPW Editor Row Title helpers
 *
 ******************************************************************************/

Template.opwEditorRowTitle.helpers({

  opwEditorTitlePlaceholder: function () {
    return 'New Section Title';
  },

});


/*******************************************************************************
 *
 * OPW Modal Editor event handlers
 *
 ******************************************************************************/

Template.opwModalEditor.events({

  // Save
  'click .opw-editor-edit-page': function (event) {

    var param           = {};

    // Formulate parameter object
    //      .. I'm not sure where these values come from anymore! lol
    //            id, content, isTop
    //            .. probably from helpers of course..or maybe they don't yet :)
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

  // Save
  'click .opw-editor-list-pages': function (event) {

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


/*******************************************************************************
 *
 * OPW Modal Editor helpers
 *
 ******************************************************************************/

Template.opwModalEditor.helpers({

  actionId: function () {

    if ('opwEditorRow' == Session.get('opwActiveEditorTemplate')) {
      return 'opw-editor-new-section-save';
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

