Meteor.methods({

    // Get the connections *real* IP
    getConnectionIp: function () {

      this.unblock();
      var ip = '';
      var o = this.connection;
      ip = idmCL.logConnection (o);
      console.log('iDM-CL by @iDoMeteor :: Connection from '
                  + ip);

      return ip;

    },

});
