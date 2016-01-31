console.log ('#OnePageWonder v1.0.0-beta.1 Loading Collections');
idmLogConnections = new Meteor.Collection('idm-log-connections');
opwContacts     = new Meteor.Collection('opwcontacts');
opwRows         = new Meteor.Collection('opwrows');

if (Meteor.isServer) {

    // Publications
    Meteor.publish ('opwRows', function () {
        return OPW.getAllActiveRows(null, false);
    });

    // Allow models (always allow all)
    idmLogConnections.allow({
        insert: function () { return true; },
        remove: function () { return true; },
        update: function () { return true; },
    });
    opwContacts.allow({
        insert: function () { return true; },
        remove: function () { return true; },
        update: function () { return true; },
    });
    opwRows.allow({
        insert: function () { return true; },
        remove: function () { return true; },
        update: function () { return true; },
    });

    
    // Deny models (all that matter)
    idmLogConnections.deny({

        // All can insert, but only if properly formatted
        insert: function () {
            return false; // TODO: Validate
        },
        // No one can remove!
        remove: function () {
            return true;
        },
        // No one can update!
        update: function () {
            return true;
        },

    });

    opwContacts.deny({

        // Anyone can insert if properly formatted and unique
        insert: function () {
            return false; // TODO: Validate
        },
        // No one can remove!
        remove: function () {
            return true;
        },
        // No one can update!
        update: function () {
            return true;
        },

    });

    opwRows.deny({

        // Only if logged in
        insert: function () {
            return (Meteor.userId()) ? false : true; // TODO: Validate
        },
        // No!
        remove: function () {
            return true;
        },
        // Only if logged in
        update: function () {
            return (Meteor.userId()) ? false : true; // TODO: Validate
        },

    });

}
