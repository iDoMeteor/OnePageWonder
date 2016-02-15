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
   * @param {String} sortField - the name of the order field, usually "order"
   * @param {Number} incDec - pass 1 or -1
   * @Returns         XXX
   * @Location        Client, Server
   *
   * @Description
   *
   *   Update the sortField of documents with given ids in a collection,
   *    incrementing it by incDec
   *
   * TODO: REFACTOR...carefully! :D
   *
   * ************************************************************************/

  opwUpdateSortOrders: function (data) {

    // Validate
    check(data, Object);
    if (!Meteor.user()) {
      OPW.log({
        message: 'You must be logged in to sort rows.',
        type: 'security',
        notifyUser: true,
      });
      return false;
    }
    if (!OPW.isCollectionId(data.id)) {
      OPW.log({
        message: 'Invalid ID for dropped element.',
        type: 'error',
        notifyUser: true,
        data: {
          id: data.id,
        }
      });
      return false;
    }
    if (
      !OPW.isNumber(data.to)
      || !OPW.isNumber(data.from)
    ) {
      OPW.log({
        message: 'Invalid sort orders encountered during update.',
        type: 'error',
        notifyUser: true,
        data: {
          id: data.id,
          to: data.to,
          from: data.from,
        }
      });
      return false;
    }
    if (!OPW.isObject(data.modifierSingle)) {
      OPW.log({
        message: 'Invalid format for dropped row update.',
        type: 'error',
        notifyUser: true,
        data: {
          id: data.id,
          modifier: JSON.stringify(data.modifierSingle, null, 2),
        }
      });
      return false;
    }
    if (!OPW.isNumber(data.step)) {
      OPW.log({
        message: 'Invalid step encountered during sorting.',
        type: 'error',
        notifyUser: true,
        data: {
          id: data.id,
          to: data.to,
          from: data.from,
          step: data.step,
        }
      });
      return false;
    }
    // TODO: Should loop through these and OPW.isCollectionID them
    if (!OPW.isObject(data.ids)) {
      OPW.log({
        message: 'Invalid ID set encountered while sorting.',
        type: 'error',
        notifyUser: true,
        data: {
          id: data.id,
          to: data.to,
          from: data.from,
          ids: JSON.stringify(data.ids, null, 2),
        }
      });
      return false;
    }
    if (!OPW.isString(data.sortField)) {
      OPW.log({
        message: 'Invalid sort field while attempting to sort rows.',
        type: 'error',
        notifyUser: true,
        data: {
          id: id,
          to: to,
          from: from,
          sortField: data.sortField,
        }
      });
      return false;
    }

    // Locals
    var sortField = data.sortField;
    // Locals for dropped row query
    var id = data.id;
    var modifierSingle = data.modifierSingle;
    var to = data.to;
    // Locals for affected rows query
    var ids = data.ids;
    var modifierMulti = {$inc: {}};
    var selector = {
      _id: {$in: ids}
    };
    var step = data.step;
    modifierMulti.$inc[sortField] = step;

    // Execute update of affected rows
    opwRows.update(selector,
                   modifierMulti,
                   {multi: true},
                   function (error, affected) {

      (affected)
        ? (
          OPW.log({
            message: 'Updated ' + affected + ' row(s).',
            type: 'debug',
            data: {
              affected: affected,
              data: JSON.stringify(data, null, 2),
              error: error,
            },
          }),
          // Update moved row
          opwRows.update({_id: id},
                         modifierSingle,
                         function (error, affected) {

            (affected)
              ? (
                // Success, update scroll indicator
                state = OPW.scrollIndicatorUpdate(),
                OPW.log({
                  message: 'Successly sorted all affected rows.',
                  type: 'debug',
                  data: {
                    affected: affected,
                    data: JSON.stringify(data, null, 2),
                    error: error,
                  },
                })
              ) : (
                // Failure, undo previous updates
                step = step * -1,
                modifierMulti.$inc[sortField] = step,
                opwRows.update(selector,
                               modifierMulti,
                               {multi: true},
                               function (error, affected) {

                  (affected)
                    ? (
                      OPW.log({
                        message: 'Reverted ' + affected + ' rows back to their'
                          + 'original order because we could not save the'
                          + 'dropped element.',
                        type: 'error',
                        notifyUser: true,
                        data: {
                          affected: affected,
                          data: JSON.stringify(data, null, 2),
                          error: error,
                        },
                      })
                    ) : (
                      OPW.log({
                        message: 'Update of dropped element failed and I could'
                          + 'not undo the changes to the affected rows.',
                        type: 'critical',
                        notifyUser: true,
                        data: {
                          affected: affected,
                          data: JSON.stringify(data, null, 2),
                          error: error,
                        },
                      })
                    );

                  return; // Yes, I am a pimp.

                })  // End reversion callback

              );

              return;

          })  // End single update callback

        ) : (

          OPW.log({
            message: 'Unable to update rows.',
            type: 'error',
            notifyUser: true,
            data: {
              affected: affected,
              data: JSON.stringify(data, null, 2),
              error: error,
            },
          })

        );  // End ternary

    });  // End multi update callback

  },

});
