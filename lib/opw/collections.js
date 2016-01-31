console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Collections');
opwAdminNotificationLog = new Meteor.Collection(opw.prefix + '-admin-notification-log');
opwContacts = new Meteor.Collection(OPW.prefix + 'contacts');
opwRows     = new Meteor.Collection(OPW.prefix + 'rows');
// TODO: Below are correct, fix before meteor reset!
// opwContacts = new Meteor.Collection(opw.prefix + '-contacts');
// opwRows     = new Meteor.Collection(opw.prefix + '-rows');

if (Meteor.isServer) {

  // Publications
  Meteor.publish ('opwHomeRow', function() {
    return OPW.getHomeRow(false);
  });

  Meteor.publish ('opwRows', function() {
    return OPW.getRows(null, false);
  });

  Meteor.publish ('opwUsers', function() {
    return Meteor.users.find({}, {fields: {username: 1}});
  });

  // TODO:
  //      Publish iDM stats & provide lightbox next to OPW brag
  //      Publish contacts for logged in user to view in a lightbox

  // Allow models (always allow all)
  opwAdminNotificationLog.allow({
    insert: function() {
      return true;
    },
    remove: function() {
      return true;
    },
    update: function() {
      return true;
    },
  });
  opwContacts.allow({
    insert: function() {
      return true;
    },
    remove: function() {
      return true;
    },
    update: function() {
      return true;
    },
  });
  opwRows.allow({
    insert: function() {
      return true;
    },
    remove: function() {
      return true;
    },
    update: function() {
      return true;
    },
  });


  // Deny models (all that matter)
  opwAdminNotificationLog.deny({
    // Anyone can insert if properly formatted and unique
    insert: function(uid, doc) {
      return (!OPW.isValidMailObject(doc));
    },
    // No one can remove!
    remove: function() {
      return true;
    },
    // No one can update!
    update: function() {
      return true;
    },

  });
  opwContacts.deny({

    // Anyone can insert if properly formatted and unique
    insert: function(userId, doc) {

      var whitelist = [
          'email',
          'label',
          'source',
          'stamp',
          'twitter',
      ]

      // Make sure we're only getting what we expect
      if ('object' != typeof (doc)) return true;
      if (0 < _.omit(doc, whitelist).length) {
        console.log('OPW DENIAL Too many keys');
        return true;
      }

      // Label
      if ('string' != typeof (doc.label)) {
        console.log('OPW DENIAL Invalid label');
        return true;
      }

      // Source
      if (false == /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(doc.source)) {
        console.log('OPW DENIAL Invalid source');
        return true;
      } else if (opwContacts.find({source: doc.source}).count()) {
        console.log('OPW DENIAL Duplicate source');
        return true;
      }

      // Stamp
      if ('object' != typeof (doc.stamp)) {
        console.log('OPW DENIAL Invalid date');
        return true;
      }

      // Contact
      if (/^.{1,255}\@[\w-.]{1,255}$/.test(doc.email)) {
        if (opwContacts.find({email: doc.email}).count()) {
          console.log('OPW DENIAL Duplicate email request');
          return true;
        }
        return false;
      } else if (/^@\w{1,15}$/.test(doc.twitter)) {
        if (opwContacts.find({twitter: doc.twitter}).count()) {
          console.log('OPW DENIAL Duplicate twitter request');
          return true;
        }
        return false;
      }

      console.log('OPW DENIAL No valid contact supplied');
      return true;

    },
    // No one can remove!
    remove: function() {
      return true;
    },
    // No one can update!
    update: function() {
      return true;
    },

  });
  opwRows.deny({

    // Only if logged in
    insert: function() {
      return (Meteor.userId()) ? false : true; // TODO: Validate here
    },
    // No!
    remove: function() {
      return true;
    },
    // Only if logged in
    update: function() {
      return (Meteor.userId()) ? false : true; // TODO: Validate here
    },

  });

}
