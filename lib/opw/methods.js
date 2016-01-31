/******************************************************************************
 *
 * OPW RPC Methods
 *
 *****************************************************************************/

Meteor.methods({

    /**************************************************************************
     *
     * @Summary         Check for duplicate contact request
     * @Method          contactExists
     * @Param           n/a
     * @Returns         {boolean}   Returns true upon failure as well
     * @Location        Client, Server
     *
     * @Description
     *
     *      Checks for an existing contact request by a user's email or Twitter
     *      handle, as well as their IP.
     *
     * ************************************************************************/
    
    opwContactExists: function (string, ip) {
        
        // Check
        check (string, String);
        check (ip, String);

        // Validate IP & check for dupe
        if (OPW.isValidIp(ip)) {
            OPW.log('Checking for duplicate source IP', 1);
            if (opwContacts.find({source: ip}).count()) {
                OPW.log('ERROR This source already exists in contact log', 2);
                return true;
            }
        } else {
            OPW.log('ERROR Invalid IP when checking for duplicates', 2);
            return true;
        }

        // Validate string & check for dupe
        if (OPW.isValidEmail(string)) {
            OPW.log('Checking for duplicate email', 1);
            return (opwContacts.find({email: string}).count());
        } else if (OPW.isValidTweeter(string)) {
            OPW.log('Checking for duplicate twitter handle', 1);
            return (opwContacts.find({twitter: string}).count());
        } else {
            OPW.log('ERROR Invalid contact when checking for duplicates', 2);
            return true;
        }

    },

});
