/*******************************************************************************
 *
 * OPW Editor event handlers
 *
 ******************************************************************************/

Template.opwEditor.events({

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
 * OPW Editor helpers
 *
 ******************************************************************************/

Template.opwEditor.helpers({

  template: function () {
    return Session.get('opwActiveEditorTemplate') || 'opwEditorDashboard';
  },

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
 * OPW Editor Log helpers
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
 * OPW Editor event handlers
 *
 ******************************************************************************/

Template.opwEditorMenu.events({

  // XXX
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

  opwSectionsLabel: function () {
    return OPW.getString('editorSectionsLabel');
  },

});


/*******************************************************************************
 *
 * OPW Editor section events
 *
 ******************************************************************************/

Template.opwEditorSection.events({

  'click .opw-edit-row': function (event) {

    console.log('Edit');

  },

  'click .opw-trash-row': function (event) {

    console.log('Trashing our rights!  Trashing!!');

  },

});

/*******************************************************************************
 *
 * OPW Editor Sections helpers
 *
 ******************************************************************************/

Template.opwEditorSections.helpers({

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
      var newIndex  = event.newIndex;
      var oldIndex  = event.oldIndex;
      OPW.log({
        data: {
          newIndex: newIndex,
          oldIndex: oldIndex
        },
        message: 'Sortable updating:',
        type: 'debug',
      });
    },
  });

});

/*******************************************************************************
 *
 * OPW Lightbox helpers
 *
 ******************************************************************************/

Template.opwModalEditor.helpers({

  closeLabel: function () {
    return OPW.getString('closeLabel');
  },

  template: function () {
    return Session.get('opwActiveEditorTemplate') || 'opwEditorDashboard';
  },

});


/*******************************************************************************
 *
 * OPW Lightbox rendered handler
 *
 ******************************************************************************/

Template.opwModalEditor.onRendered(function () {

    var target = this.find('.modal');
    $(target).modal('show');
    $(target).on('hidden.bs.modal', function () {
        $(target).remove();
    });

});

