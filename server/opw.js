console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Main Server Environment');
/*******************************************************************************
 *
 * Instantiate & connect to Kadira, if enabled
 *
 * ****************************************************************************/

if (opw.kadira 
    && opw.kadira.enabled
    && opw.kadira.key
    && opw.kadira.secret
) {
    console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Kadira.io ');
    Kadira.connect(opw.kadira.key, opw.kadira.secret);
}


/*******************************************************************************
 *
 * Instantiate database if *empty*
 *
 * ****************************************************************************/

if (OPW.noRowsExist()) {
    OPW.init();
}


/*******************************************************************************
 *
 * Hook into Meteor.createUser
 * This prevents more than one user being registered
 *
 * ****************************************************************************/

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


/*******************************************************************************
 *
 * Meteor Startup... not that it hasn't already started, lol.
 * .. maybe it's Meteor/OPW has loaded...
 *
 * ****************************************************************************/

Meteor.startup(function fnMSU () {

    console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Meteor has started. :)');

});
