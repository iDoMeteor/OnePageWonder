Meteor.startup(function iDM_CL_StartUp () {
  // iDM Connection Log IP Cheat
  Meteor.call('getConnectionIp', function (error, ip) {
    // Save it
    Session.set('currentIp', ip);
    // Register global helper
    UI.registerHelper('currentIp', function () {
      return Session.get('currentIp');
    });
    return;
  });
  return;
});
