console.log ('#OnePageWonder v1.0.0-beta.1 Loading Main Server Environment');
/***
 *
 * DOXXXXXXXXXXXXXXXXX
 *
 */
if (opwKadiraKeys && opwKadiraKeys.enabled) {
    Kadira.connect(opwKadiraKeys.key, opwKadiraKeys.secret)
}

/**************************************************************************
 *
 * Register DDP connection callback function
 * Use this.stop() if it goes batty
 *
 *************************************************************************/

Meteor.onConnection(function (o) {

    idmCO = o;
    idmCL.logConnection (o);
    /*
    UI.registerHelper('currentUserIp', function () {
        console.log('connection ip: ' + ip);
        return OPW.getUserIp(o);
    });
    */

});

/**************************************************************************
 *
 * Instantiate database if their is no valid content
 *
 *************************************************************************/

if (!OPW.getRows().length) {
    OPW.init();
}

/**************************************************************************
 *
 * Hook into Meteor.createUser
 * This prevents more than one user being registered
 *
 *************************************************************************/

Accounts.onCreateUser(function (options, user) {
    // If a user account already exists, reject
    if (0 == Meteor.users.find().count()) {
        user.profile = options.profile;
        return user;
    } else {
        console.log ('#OnePageWonder ERROR There may only be one user of #OnePageWonder.');
        Accounts.config({forbidClientAccountCreation: true});
        return;
    }
});


/**************************************************************************
 *
 * Meteor Startup
 *
 *************************************************************************/

Meteor.startup(function fnMSU () {


});
