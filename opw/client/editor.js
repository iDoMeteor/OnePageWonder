/*******************************************************************************
 *
 * OPW Editor event handlers
 *
 * Note: This is *very* in progress.
 *
 ******************************************************************************/

Template.opwEditor.events({

  // XXX
  'click #opw-editor-config': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.removeRow($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-config-lock': function (event) {

    event.preventDefault();


    // TODO: Confirm with user

    OPW.removeRow($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-config-save': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.removeRow($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-config-unlock': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.removeRow($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-config': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.removeRow($(event.target).attr('id'));
    Router.go('/');

  },

  // XXX
  'click #opw-editor-dashboard': function (event) {

    event.preventDefault();

    // TODO: Confirm with user

    OPW.removeRow($(event.target).attr('id'));
    Router.go('/');

  },

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
  'click #opw-editor-save-close': function (event) {

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

  // Save
  'click #opw-editor-save-new': function (event) {


  },

  // Save
  'click #opw-editor-save-next': function (event) {


  },

  // Save
  'click #opw-editor-save-prev': function (event) {


  },

  // Save
  'click #opw-editor-save-stay': function (event) {


  },

  // Save
  'drag .something': function (event) {


  },

  // Save
  'drop .something': function (event) {


  },

});


/*******************************************************************************
 *
 * OPW Editor helpers
 *
 ******************************************************************************/

Template.opwEditor.helpers({

  // Set up for the editor's select range
  opwRowSortRange: function () {
    return _.range(0,99);
  }

});


/*******************************************************************************
 *
 * OPW Editor rendered handler
 *
 ******************************************************************************/

Template.opwEditor.onRendered(function () {

  $('opw-editor').modal({keyboard: false});

});


/*******************************************************************************
 *
 * OPW Editor list helpers
 *
 ******************************************************************************/

Template.opwEditorRowTitle.helpers({

  /*
  opwRowListOptions: function () {
    return {
      handle: '.fa-arrows-v',
      onSort: function(event) {
        console.log('Moved player #%d from %d to %d',
                    event.data.order, event.oldIndex, event.newIndex
                   );
      },
    };
  }
  */

});

/*******************************************************************************
 *
 * OPW Editor list editor rendered handler
 *
 ******************************************************************************/

Template.opwEditor.onRendered(function () {


  var list = $('#opw-editor-title-order');
  Sortable.create(list, {
    animation: 150,
    /*
    onUpdate: function (event) {
      var target  = event.item;
      var indCur  = event.data.order;
      var indOld  = event.oldIndex;
      var indNew  = event.newIndex;
      console.log(indCur, indOld, indNew, target);
    */
    });  // Awesome.

});

