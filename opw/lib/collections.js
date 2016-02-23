console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Collections');
opwAdminNotificationLog = new Meteor.Collection(OPW.getConfig('prefix') + '-admin-notification-log');
opwContacts             = new Meteor.Collection(OPW.getConfig('prefix') + '-contacts');
opwLog                  = new Meteor.Collection(OPW.getConfig('prefix') + '-log');
opwRows                 = new Meteor.Collection(OPW.getConfig('prefix') + '-rows');
opwSingletons           = new Meteor.Collection(OPW.getConfig('prefix') + '-singletons');

if (Meteor.isServer) {

  // Data Publications
  Meteor.publish ('opwAdminNotificationLog', function () {
    if (this.userId) {
      return OPW.getAdminNotificationLog(false);
    } else {
      this.ready();
    }
  });

  Meteor.publish ('opwAuthenticationHistory', function () {
    if (this.userId) {
      return OPW.getAuthenticationHistory(false);
    } else {
      this.ready();
    }
  });

  Meteor.publish ('opwContacts', function () {
    if (this.userId) {
      return OPW.getContacts(false);
    } else {
      this.ready();
    }
  });

  Meteor.publish ('opwHomeRow', function () {
    return OPW.getHomeRow(false);
  });

  Meteor.publish ('opwRawLog', function () {
    if (this.userId) {
      return OPW.getRawLog(false);
    } else {
      this.ready();
    }
  });

  Meteor.publish ('opwRows', function () {
    return OPW.getRows(null, false);
  });

  Meteor.publish ('opwSecurityLog', function () {
    if (this.userId) {
      return OPW.getSecurityLog(false);
    } else {
      this.ready();
    }
  });

  Meteor.publish ('opwUsers', function () {
    if (this.userId) {
      return Meteor.users.find({});
    } else {
      return Meteor.users.find({}, {fields: {username: 1}});
    }
  });

  Meteor.publish ('opwSingletons', function () {
    return OPW.getSingletons(false);
  });

  // Allow models (always allow all)
  opwAdminNotificationLog.allow({
    insert: function () { return true; },
    remove: function () { return true; },
    update: function () { return true; },
  });
  opwContacts.allow({
    insert: function () { return true; },
    remove: function () { return true; },
    update: function () { return true; },
  });
  opwLog.allow({
    insert: function () { return true; },
    remove: function () { return true; },
    update: function () { return true; },
  });
  opwRows.allow({
    insert: function () { return true; },
    remove: function () { return true; },
    update: function () { return true; },
  });
  opwSingletons.allow({
    insert: function () { return true; },
    remove: function () { return true; },
    update: function () { return true; },
  });


  // Deny models (all that matter)
  opwAdminNotificationLog.deny({
    // Anyone can insert if properly formatted and unique
    insert: function (uid, doc) {
      return (!OPW.isValidLogObject(doc));
    },
    // No one can remove!
    remove: function () {
      return true;
    },
    // Allow if logged in
    update: function () {
      return (Meteor.userId()) ? false : true;
    },

  });

  opwContacts.deny({

    // Anyone can insert if properly formatted and unique
    insert: function (userId, doc) {

      var whitelist = [
        'label',
        'message',
        'source',
        'stamp',
        'user',
      ]

      // Make sure we're only getting what we expect
      if ('object' != typeof(doc)) return true;
      if (0 < _.omit(doc, whitelist).length) {
        console.log('OPW DENIAL Too many keys');
        return true;
      }

      // Label
      if ('string' != typeof(doc.label)) {
        console.log('OPW DENIAL Invalid label');
        return true;
      }

      // Message
      if (doc.message && 'string' != typeof(doc.message)) {
        console.log('OPW DENIAL Invalid message');
        return true;
      }

      // Source
      if (false == /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(doc.source)) {
        console.log('OPW DENIAL Invalid source');
        return true;
      }

      // Stamp
      if ('object' != typeof(doc.stamp)) {
        console.log('OPW DENIAL Invalid date');
        return true;
      }

      // User
      if ('string' != typeof(doc.user)) {
        console.log('OPW DENIAL Invalid message');
        return true;
      }

      return false;

    },
    // No one can remove!
    remove: function () {
      return true;
    },
    // Allow if logged in
    update: function () {
      return (Meteor.userId()) ? false : true;
    },

  });

  opwLog.deny({
    // Anyone can insert if properly formatted and unique
    insert: function (uid, doc) {
      return (!OPW.isValidLogObject(doc));
    },
    // No one can remove!
    remove: function () {
      return true;
    },
    // Allow if logged in or consolidating
    update: function (uid, doc) {
      if (Meteor.userId) {
        return false;
      } else if (doc.consolidated) {
        // TODO: Validate better
        return false;
      }
      return true;
    },

  });

  opwRows.deny({

    // Only if logged in
    insert: function () {
      return (Meteor.userId()) ? false : true; // TODO: Validate here
    },
    // No!
    remove: function () {
      return true;
    },
    // Only if logged in
    update: function (uid, doc) {
      return (Meteor.userId()) ? false : true;
    },

  });

  opwSingletons.deny({

    // Only if logged in
    insert: function () {
      return (Meteor.userId()) ? false : true; // TODO: Validate here
    },
    // No!
    remove: function () {
      return true;
    },
    // Only if logged in
    update: function () {
      return (Meteor.userId()) ? false : true; // TODO: Validate here
    },

  });

}
