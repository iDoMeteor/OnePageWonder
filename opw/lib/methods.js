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

  /**************************************************************************
   *
   * @Summary         Update Row Sort Orders
   * @Method          opwUpdateSortOrders
   * @param {String} collectionName - name of the collection to update
   * @param {String[]} ids - array of document ids
   * @param {String} orderField - the name of the order field, usually "order"
   * @param {Number} incDec - pass 1 or -1
   * @Returns         XXX
   * @Location        Client, Server
   *
   * @Description
   *
   *   Update the sortField of documents with given ids in a collection,
   *    incrementing it by incDec
   *
   * TODO: THIS IS WIDE OPEN TO ATTACK, VALIDATE!!!!!!!!!!!!!!!!!!!!!!!!
   *
   * ************************************************************************/

  opwUpdateSortOrders: function (ids, sortField, step, id, modifier) {

    // Validate
    check(ids, [String]);
    check(sortField, String);
    check(step, Number);

    // Locals
    var selector = {
      _id: {$in: ids}
    };
    var modifier = {$inc: {}};
    modifier.$inc[sortField] = step;

    opwRows.update(selector, modifier, {multi: true}, function (error, affected) {

      (error) ?
        OPW.log({
          message: 'Unable to update rows.',
          type: 'error',
          notifyUser: true,
          data: {
            affected: affected,
            error: error,
          },
        })
        :
        OPW.log({
          message: 'Updated ' + affected + ' rows.',
          type: 'success',
          notifyUser: true,
          data: {
            affected: affected,
            error: error,
          },
        });

    });

  },

});
