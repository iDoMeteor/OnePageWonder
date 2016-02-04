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
     * @Returns         {object}   Returns true upon failure as well
     * @Location        Client, Server
     *
     * @Description
     *
     *      Checks for an existing contact request by a user's email or Twitter
     *      handle, as well as their IP.
     *
     *      TODO:
     *            Abstract the queries
     *            Call insertContact if dupes = false
     *
     * ************************************************************************/

    opwContactExists: function (contact) {

        // TODO: Upgrade to new logger

        // Check.. I hate it. :D
        check (contact, Object);

        // If message is set, dupe must have message
        if (contact.message && OPW.isString(contact.message)) {
          if (
            (opwContacts.find({
              message: {$exists: true},
              source: contact.source
            }).count())
            || (opwContacts.find({
              message: {$exists: true},
              user: contact.user
            }).count())
          ) {
            return {
              isDuplicate: true,
              message: 'A message request already exists for this user.',
            };
          }
        }

        // Validate IP & check for dupe
        if (OPW.isValidIp(contact.source)) {
            if (opwContacts.find({source: contact.source}).count()) {
              return {
                isDuplicate: true,
                message: 'A contact request of this type from this IP'
                + ' already exists.',
              };
            }
        } else {
              return {
                error: true,
                message: 'Invalid IP when checking for contact duplicates.',
              };
        }

        // Validate string & check for dupe
        if (OPW.isValidEmailOrTwitter(contact.user)) {
            if (opwContacts.find({user: contact.user}).count()) {
              return {
                isDuplicate: true,
                message: 'A contact request of this user already exists.',
              };
            }
        } else {
            return {
              error: true,
              message: 'Invalid contact when checking for duplicates',
            };
        }

        // Similar contact request does not exist
        return {
          isDuplicate: false,
        };

    },

});
