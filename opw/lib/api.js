console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading API');
/*******************************************************************************
 *
 * @Summary     #OnePageWonder Application Programming Interface
 * @Version     v1.0.0-RC.2 {{Rowdy Rainbow}}
 *
 * @Author      @iDoMeteor, iDoMeteor@Gmail.com, aka Jason Edward White
 * @Class
 * @File        /lib/opw/api.js
 *
 *
 * @Description
 *
 * This file provides methods available to both the client and the server and
 * processes most database interactions as well as complex / repetitive client
 * events.  Instantiated as a global object.  It is not meant to propogate or
 * maintain state. Therefore, there is & shall ever be, just one instance of it.
 *
 * All methods that return query results from the database take an optional
 * fetch parameter allowing it to return a cursor to publications or live
 * reactive data to normal queries.
 *
 * If you wish to contribute or extend this API and intend to submit a pull
 * request, please read the coding style section of the README.md. :>
 *
 * TODO:
 *      FIX DOCUMENTAION & XXXs
 *      Version history browser & restore
 *      Add userActive, isLoggedIn, isAnonymousUser
 *      Before considered 'production quality', all the queries should be
 *          optimized, there's a lot of select * going on atm :)
 *
 * ****************************************************************************/

OPW = {

  /***************************************************************************
   *
   * @Summary         Adjust Row Orders
   * @Method          adjustRowOrder
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client
   *
   * @Description
   *
   * TODO: Re-factor to reduce length
   *
   * ************************************************************************/

  adjustRowOrder: function(id, to, from, filter) {

    // Validate
    if (!OPW.isCollectionId(id)) {
      OPW.log({
        message: 'Invalid row id while attempting to sort.',
        type: 'error',
        notifyUser: true,
        data: {
          id: id,
          to: to,
          from: from,
          filter: filter,
        }
      });
      return false;
    }
    if (
      !OPW.isNumber(to)
      || !OPW.isNumber(from)
    ) {
      OPW.log({
        message: 'Invalid data encountered while attempting to sort.',
        type: 'error',
        notifyUser: true,
        data: {
          id: id,
          to: to,
          from: from,
          filter: filter,
        }
      });
      return false;
    }
    if (filter && !OPW.isObject(filter)) {
      OPW.log({
        message: 'Invalid filter encountered while attempting to sort.',
        type: 'error',
        notifyUser: true,
        data: {
          id: id,
          to: to,
          from: from,
          filter: filter,
        }
      });
      return false;
    }

    // Locals
    var sortField = 'order';
    var selector = filter || {};
    var modifier = {$set: {}};
    modifier.$set[sortField] = to;
    var ids = [];
    var data = {
        id: id,
        modifierSingle: modifier,
        sortField: sortField,
        to: to,
        from: from,
      };

    // Process affected rows
    if (to > from) {
      // Moved item down, decrease the order of intervening elements

      selector[sortField] = {
        $lte: to,
        $gt: from
      };

      data.step = -1;
      data.ids = _.pluck(opwRows.find(selector, {
        fields: {_id: 1}
      }).fetch(), '_id');

      // Execute query
      Meteor.call('opwUpdateSortOrders', data);

    } else if (to < from) {
      // Moved item up, increase the order of intervening elements

      selector[sortField] = {
        $gte: to,
        $lt: from
      };

      data.step = 1;
      data.ids = _.pluck(opwRows.find(selector, {
        fields: {_id: 1}
      }).fetch(), '_id');

      // Execute query
      Meteor.call('opwUpdateSortOrders', data);

    }


    return;

  },



  /***************************************************************************
   *
   * @Summary         Bootstrap linter
   * @Access          Determined via configuration
   * @Method          bootLint
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client
   *
   * @Description
   *
   *      Loads the latest Twitter Bootstrap Linter via Bootstrap CDN, runs
   *      the report and appends it to the body as well as providing console
   *      output.
   *
   * ************************************************************************/

  bootLint: function() {

    if (OPW.getNestedConfig('linter', 'requireLogin') && !Meteor.userId()) {
      OPW.log({
        message: 'You must be logged in to run the linters.',
        type: 'error',
      });
      return;
    }

    var script      = document.createElement("script");
    script.onload   = function() {
      bootlint.showLintReportForCurrentDocument([]);
    };
    script.src =
        'https://maxcdn.bootstrapcdn.com/bootlint/latest/bootlint.min.js';
    document.body.appendChild(script)

  },


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
   *      TODO:
   *          Should only reject duplicate users if they have an unread
   *          message already enqueued.
   *          If submitting detailed request and they have existing inline
   *          request, consolidate in to one request.
   *
   * ************************************************************************/

  contactExists: function(string, ip) {

    // Validate IP & check for dupe
    if (OPW.isValidIp(ip)) {
      OPW.log({
        message: 'Checking for duplicate source IP',
        type: 'debug',
      });
      if (opwContacts.find({source: ip}).count()) {
        OPW.log({
          message: 'This source already exists in contact log.',
          type: 'danger',
          sendEvent: true,
          eventTitle: 'Duplicate IP via Contact',
          notifyUser: true,
        });
        return true;
      }
    } else {
      OPW.log({
        message: 'Invalid IP when checking for duplicates',
        type: 'error',
        sendEvent: true,
        eventTag: 'Invalid IP via Contact',
        notifyUser: true,
      });
      return true;
    }

    // Validate string & check for dupe
    if (OPW.isValidEmail(string)) {
      OPW.log({
        message: 'Checking for duplicate email',
        type: 'debug',
      });
      return (opwContacts.find({email: string}).count());
    } else if (OPW.isValidTweeter(string)) {
      OPW.log({
        message: 'Checking for duplicate twitter handle',
        type: 'debug',
      });
      return (opwContacts.find({twitter: string}).count());
    } else {
      OPW.log({
        message: 'Invalid contact when checking for duplicates',
        type: 'error',
        sendEvent: true,
        eventTag: 'Invalid User via Contact',
        notifyUser: true,
      });
      return true;
    }

  },


  /***************************************************************************
   *
   * @Summary         Resets the contact form to initial state
   * @Method          contactModalFormReset
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Removes valid & invalid flags and sets the open flag
   *
   * ************************************************************************/

  contactModalFormReset: function(template) {
    OPW.flagReset(template, '.opw-contact-flag');
    OPW.flagReset(template, '#opw-contact-message-flag');
    OPW.flagReset(template, '#opw-contact-subject-flag');
  },


  /***************************************************************************
   *
   * @Summary         Count number of users registered
   * @Method          countUsers
   * @Param           n/a
   * @Returns         {number}    A positive integer or false
   * @Location        Client, Server
   *
   * ************************************************************************/

  countUsers: function() {
    return Meteor.users.find().count();
  },


  /***************************************************************************
   *
   * @Summary         Wraps Accounts.createUser and manipulates DOM
   * @Method          createUser
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Calls Accounts.createUser and logs appropriate messages on failure,
   *      or resets the form, pops a welcome message & takes user to /
   *
   * ************************************************************************/

  createUser: function(options) {

    Accounts.createUser(options, function(error) {
      if (error) {
        // Failure
        OPW.log({
          message: 'Failed to create new user.  This most likely means the '
            + 'one and only user allowed has already been '
            + 'created.  If you are locked out, issue '
            + 'Meteor.users.remove({}) on the server and then '
            + 'create a new user using the authentication form.',
          type: 'error',
          data: error,
          notifyUser: true,
        });
        return false;
      } else {
        // Success, clear and close modal
        $('#opw-auth-email').val('');
        $('#opw-auth-password').val('');
        $('#opw-authenticate').modal('hide');
        OPW.log({
          message: OPW.getString('newUserWelcome'),
          type: 'success',
          notifyUser: true,
          notifyAdmin: true,
          data: options,
        });
        // Go home
        Router.go('/');
        return true;
      }

    });

  },


  /***************************************************************************
   *
   * @Summary         Callback a function with result or return the result
   * @Method          returnCall
   * @Param           n/a
   * @Returns         Result of callback or passed in result
   * @Location        Client, Server
   *
   * ************************************************************************/

  returnCall: function (fx, error, result) {

      if (OPW.isFunction(fx)) {
        fx(error, result);
      }
      return;

  },


  /***************************************************************************
   *
   * @Summary         Expires a row by ID, checks for authenticated user
   * @Method          expireRow
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  expireRow: function(id) {

    // Check perms
    if (!Meteor.userId()) {
      OPW.log({
        message: 'You must be logged in to expire a row.',
        notifyUser: true,
        type: 'error',
      });
      return;
    }

    // Validate
    if (!OPW.isCollectionId(id)) {
      OPW.log({
        message: 'Invalid attempt to expire row.',
        notifyUser: true,
        type: 'error',
      });
      return;
    }

    // Do it
    opwRows.update({
      '_id': id
    }, {
      $set: {
        'stale':          true,
        'stamps.expired':   new Date()
      }
    }, function expireRowCallback (error, affected) {

      (affected) ? (
          OPW.log({
            message: 'Expired previous row.',
            type: 'success',
          })
      ) : (
          OPW.log({
            message: 'Failed to expire previous row.',
            notifyUser: true,
            type: 'error',
          })
      );

      return;

    });

    return;

  },


  /***************************************************************************
   *
   * @Summary         Changes a flag to invalid status
   * @Method          flagInvalid
   * @Param           n/a
   * @Returns         undefined
    @Location        Client, Server
   *
   * @Description
   *
   *      Removes non-invalid flag classes and adds invalid class
   *
   * ************************************************************************/

  flagInvalid: function(template, identifier) {
    if (
      !OPW.isTemplateInstance(template)
      || !OPW.isString(identifier)
    ) {
      OPW.log({
        message: 'Invalid attempt to set invalid flag',
        type: 'error',
        data: identifier,
      });
      return;
    }
    // Remove default indicator
    $(template.find(identifier))
      .removeClass('fa-flag-o text-muted');
    // Remove valid indicator
    $(template.find(identifier))
      .removeClass('fa-flag-checkered bg-success');
    // Set invalid indicator
    $(template.find(identifier))
      .addClass('fa-flag bg-danger');
  },


  /***************************************************************************
   *
   * @Summary         Resets a FA flag to initial state
   * @Method          contactFormReset
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Removes valid & invalid flags and sets the open flag
   *
   * ************************************************************************/

  flagReset: function(template, identifier) {
    if (
      !OPW.isTemplateInstance(template)
      || !OPW.isString(identifier)
    ) {
      OPW.log({
        message: 'Invalid attempt to reset flag',
        type: 'error',
        data: identifier,
      });
      return;
    }
    // Remove valid indicator
    $(template.find(identifier))
      .removeClass('fa-flag-checkered bg-success');
    // Remove invalid indicator
    $(template.find(identifier))
      .removeClass('fa-flag bg-danger');
    // Assign default indicator
    $(template.find(identifier))
      .addClass('fa-flag-o text-muted');
  },


  /***************************************************************************
   *
   * @Summary         Changes a flag to valid status
   * @Method          flagValid
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Removes non-valid flag classes and adds valid class
   *
   * ************************************************************************/

  flagValid: function(template, identifier) {
    if (
      !OPW.isTemplateInstance(template)
      || !OPW.isString(identifier)
    ) {
      OPW.log({
        message: 'Invalid attempt to set valid flag',
        type: 'error',
        data: identifier,
      });
      return;
    }
    // Remove default indicator
    $(template.find(identifier))
      .removeClass('fa-flag-o text-muted');
    // Remove invalid indicator
    $(template.find(identifier))
      .removeClass('fa-flag bg-danger');
    // Set valid indicator
    $(template.find(identifier))
      .addClass('fa-flag-checkered bg-success');
  },


  /***************************************************************************
   *
   * @Summary         Flash background-color
   * @Method          flashBG
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      This will add & remove 'bg-invalid' class to/from an element.
   *
   * ************************************************************************/

  flashBG: function(selector) {

    if (Meteor.isServer) {
      return;
    }
    // Validate selector TODO: Better
    if (!OPW.isString(selector)) {
      return;
    }

    $(selector).addClass('bg-invalid', 200, function() {
      $(selector).removeClass('bg-invalid', 400);
    });

  },


  /*****************
   *
   */

  gaEnabled: function() {
    return (
        idmGA && idmGA.pageview && idmGA.event
        && OPW.getNestedConfig('google', 'enable')
        && OPW.getNestedConfig('google', 'account')
    ) ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Gets unread admin notifications
   * @Method          getAdminNotificationLog
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getAdminNotificationLog: function(fetch) {

    // Locals
    fetch = ('boolean' == typeof (fetch))
      ? fetch : true;
      // Do it
      return (fetch) ? (
        opwAdminNotificationLog.find({
          read: {$ne: true}
        }, {
          limit: OPW.getNestedConfig('numerics', 'publishLimit'),
          sort: {date: -1},
        }).fetch()
      ) : (
        opwAdminNotificationLog.find({}, {
          limit: OPW.getNestedConfig('numerics', 'publishLimit'),
          sort: {date: -1},
        })
      )

  },


  /***************************************************************************
   *
   * @Summary         Gets unread authentication history
   * @Method          getAuthenticationHistory
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getAuthenticationHistory: function(fetch) {

    // Locals
    fetch = ('boolean' == typeof (fetch))
      ? fetch : true;
    selector = {
      auth: true,
      read: {$ne: true},
    };

    // Do it
    return (fetch) ? (
      opwLog.find(selector, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {date: -1},
      }).fetch()
    ) : (
      opwLog.find(selector, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {date: -1},
      })
    )

  },


  /***************************************************************************
   *
   * @Summary         Get all active rows
   * @Method          getAllActiveRows
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Selects all rows that should be displayed to an anonymous user.
   *      That means they are not stale, not removed.  Potentially limited
   *      by limit.  If fetch is passed in as false, then a cursor will be
   *      returned.  Otherwise, the resulting collection of documents will
   *      be returned, which could be falsey if there are no matches.
   *
   * ************************************************************************/

  getAllActiveRows: function(limit, fetch) {

    // Locals
    limit           = limit || OPW.getNestedConfig('numerics', 'menuItemMaxCount');
    fetch           = ('boolean' == typeof (fetch))
                      ? fetch : true;
    var selector    = {
      removed:    {$ne: true},
      stale:      {$ne: true},
    }
    var projection  = {
      limit:      limit,
    };

    // Do it
    return (fetch) ? (
        opwRows.find(selector, projection).fetch()
    ) : (
        opwRows.find(selector, projection)
    )
  },


  /***************************************************************************
   *
   * @Summary         Selects all rows, regardless of flags
   * @Method          getAllRows
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Returns every row in the database unless limited by limit
   *
   * ************************************************************************/

  getAllRows: function(limit, fetch) {

    // Check perms
    if (!Meteor.userId()) {
      OPW.log({
        message: 'j00 must be l0gged in',
        type: 'security',
        notifyUser: true,
        data: identifier,
      });
      return;
    }

    // Locals
    limit           = limit || null;
    fetch           = ('boolean' == typeof (fetch))
                      ? fetch : true;
    var selector    = {}
    var projection  = {
      limit:      limit,
    };

    // Do it
    return (fetch) ? (
        opwRows.find(selector, projection).fetch()
    ) : (
        opwRows.find(selector, projection)
    )
  },


  /***************************************************************************
   *
   * @Summary         Returns a configuration root key value
   * @Method          getConfig
   * @Param           {string} key
   * @Returns         undefined If no value found
   * @Location        Client, Server
   *
   * @Description
   *
   *      Database settings override Meteor settings override defaults
   *
   *  TODO:
   *
   *      Re-factor string to boolean conversion
   *
   * ************************************************************************/

  getConfig: function(key) {

    // Validate
    if (!OPW.isString(key)) {
      OPW.log({
        message: 'Attempting to get invalid configuration type',
        type: 'error',
      });
      return;
    }

    // Set up for return value
    var value = '';

    // Check key exists in defaults
    if (!opw.hasOwnProperty(key)) {
      OPW.log({
        message: 'Attempting to get invalid configuration value',
        type: 'error',
        data: key,
      });
      return;
    }

    // Check for key & value in Singletons
    /*
    if (XXX) {
      OPW.log({
        message: 'Attempting to get invalid configuration value',
        type: 'error',
        data: key,
      });
      return opw[key];
    }
    */

    // Check for key & value in Meteor.settings
    if (Meteor.settings.hasOwnProperty('opw')) {
      if (Meteor.settings.opw.hasOwnProperty(key)) {
        value = Meteor.settings.opw[key];
        if ('false' == value) {
          value = false;
        } else if ('true' == value) {
          value = true;
        }
        return value;
      }
    }

    // Check for key & value in Meteor.settings.public
    if (Meteor.settings['public'].hasOwnProperty('opw')) {
      if (Meteor.settings['public']['opw'].hasOwnProperty(key)) {
        value = Meteor.settings['public']['opw'][key];
        if ('false' == value) {
          value = false;
        } else if ('true' == value) {
          value = true;
        }
        return value;
      }
    }

    // If all else fails, return default
    return opw[key];

  },


  /***************************************************************************
   *
   * @Summary         Gets contact log for logged in user
   * @Method          getContacts
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getContacts: function(fetch) {

    // Locals
    fetch = ('boolean' == typeof (fetch))
      ? fetch : true;
    selector = {
      read: {$ne: true},
    };

    // Do it
    return (fetch) ? (
      opwContacts.find(selector, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {stamp: -1},
      }).fetch()
    ) : (
      opwContacts.find(selector, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {stamp: -1},
      })
    )

  },


  /***************************************************************************
   *
   * @Summary         Gets the home row data
   * @Method          getHomeRow
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Selects the active home row and returns a single document or cursor
   *
   * ************************************************************************/

  getHomeRow: function(fetch) {

    // Locals
    fetch       = ('boolean' == typeof (fetch))
                      ? fetch : true;
    selector    = {
      removed:    {$ne: true},
      slug:       'top',
      stale:      {$ne: true},
    };

    // Do it
    return (fetch) ? (
        opwRows.findOne(selector)
    ) : (
        opwRows.find(selector, {limit: 1})
    )

  },


  /***************************************************************************
   *
   * @Summary         Takes a valid slug and selects its active document
   * @Method          getIdFromSlug
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *    Gets the ID of the active document matching the slug provided,
   *      it is used when performing updates from the client (prevents
   *      the need to publish it)
   * ************************************************************************/

  getIdFromSlug: function(slug) {

    if (!OPW.isString(slug)) {
      return false;
    }

    var selector    = {
      removed:    {$ne: true},
      slug:       slug,
      stale:      {$ne: true},
    }

    // Do it
    return opwRows.findOne(selector)._id;

  },


  /**
  * getNestedConfig
  *
  * @name getNestedConfig
  * @function
  * @access public
  * @param {string} k1 Top level property, required
  * @param {string} k2 Second level property, optional
  * @param {string} k3 Tertiary property, optional
  * @return {any} Can return any valid data type
  *
  * TODO:
  *  Database settings
  *  Re-factor string to boolean conversion
  *
   */
  getNestedConfig: function(k1, k2, k3) {

    // Set up for return value
    var value = '';

    // Make sure we have at least one key to get
    if (!k1 || !OPW.isString(k1)) {
      OPW.log({
        message: 'Invalid attempt to get nested configuration value',
        type: 'error',
      });
      return;
    }

    // If k2 or k3 are set, they must be strings
    if (
        (k2 && !OPW.isString(k2))
        || (k3 && !OPW.isString(k3))
       ) {
      OPW.log({
        message: 'Attempting to get invalid configuration property',
        type: 'error',
      });
      return;
    }

    // Make sure if k3 is set, all keys are set
    if (k3 && !k2) {
      OPW.log({
        message: 'Invalid nested config format',
        type: 'error',
        data: {
          k1: k1,
          k2: k2,
          k3: k3,
        },
      });
    }

    // Check passed keys exist in defaults
    if (k1 && !opw.hasOwnProperty(k1)) {
      OPW.log({
        message: 'Invalid nested config format',
        type: 'error',
        data: {
          k1: k1,
          k2: k2,
          k3: k3,
        },
      });
    }
    if (k2 && !opw[k1].hasOwnProperty(k2)) {
      OPW.log({
        message: 'Invalid nested config format',
        type: 'error',
        data: {
          k1: k1,
          k2: k2,
          k3: k3,
        },
      });
    }
    if (k3 && !opw[k1][k2].hasOwnProperty(k3)) {
      OPW.log({
        message: 'Invalid nested config format',
        type: 'error',
        data: {
          k1: k1,
          k2: k2,
          k3: k3,
        },
      });
    }

    // All passed keys are valid, now pick our favorite version & return it

    // Prefer database
    // TODO


    // Then private user deployment overrides
    if (k3
        && Meteor.settings.hasOwnProperty('opw')
      && Meteor.settings.opw.hasOwnProperty(k1)
      && Meteor.settings.opw[k1].hasOwnProperty(k2)
      && Meteor.settings.opw[k1][k2].hasOwnProperty(k3)
       ) {
         value = Meteor.settings.opw[k1][k2][k3];
         if ('false' == value) {
           value = false;
         } else if ('true' == value) {
           value = true;
         }
         return value;
       }
    if (!k3 && k2
        && Meteor.settings.hasOwnProperty('opw')
        && Meteor.settings.opw.hasOwnProperty(k1)
        && Meteor.settings.opw[k1].hasOwnProperty(k2)
       ) {
         value = Meteor.settings.opw[k1][k2];
         if ('false' == value) {
           value = false;
         } else if ('true' == value) {
           value = true;
         }
         return value;
       }
    if (!k3 && !k2
        && Meteor.settings.hasOwnProperty('opw')
        && Meteor.settings.opw.hasOwnProperty(k1)
       ) {
         value = Meteor.settings.opw[k1];
         if ('false' == value) {
           value = false;
         } else if ('true' == value) {
           value = true;
         }
         return value;
       }

    // Check public user deployment overrides
    if (k3
        && Meteor.settings['public'].hasOwnProperty('opw')
        && Meteor.settings['public']['opw'].hasOwnProperty(k1)
        && Meteor.settings['public']['opw'][k1].hasOwnProperty(k2)
        && Meteor.settings['public']['opw'][k1][k2].hasOwnProperty(k3)
       ) {
         value = Meteor.settings['public']['opw'][k1][k2][k3];
         if ('false' == value) {
           value = false;
         } else if ('true' == value) {
           value = true;
         }
         return value;
       }
    if (!k3 && k2
        && Meteor.settings['public'].hasOwnProperty('opw')
        && Meteor.settings['public']['opw'].hasOwnProperty(k1)
        && Meteor.settings['public']['opw'][k1].hasOwnProperty(k2)
       ) {
         value = Meteor.settings['public']['opw'][k1][k2];
         if ('false' == value) {
           value = false;
         } else if ('true' == value) {
           value = true;
         }
         return value;
       }
    if (!k3 && !k2
        && Meteor.settings['public'].hasOwnProperty('opw')
        && Meteor.settings['public']['opw'].hasOwnProperty(k1)
       ) {
         value = Meteor.settings['public']['opw'][k1];
         if ('false' == value) {
           value = false;
         } else if ('true' == value) {
           value = true;
         }
         return value;
       }

    // Default if all else fails
    if (k3) return opw[k1][k2][k3];
    if (k2) return opw[k1][k2];
    if (k1) return opw[k1];

  },


  /**
  * getNestedConfigOld
  *
  * @name getNestedConfigOld
  * @function
  * @access public
  * @param {string} k1 Top level property, required
  * @param {string} k2 Second level property, optional
  * @param {string} k3 Tertiary property, optional
  * @return {any} Can return any valid data type
  *
  * TODO:
  *  Database settings
  *
   */
  getNestedConfigOld: function(k1, k2, k3) {

    // Validate
    if (!k1) {
      OPW.log({
        message: 'Invalid attempt to get nested configuration value',
        type: 'error',
      });
      return;
    }

    if (
        (!OPW.isString(k1))
        || (k2 && !OPW.isString(k2))
        || (k3 && !OPW.isString(k3))
       ) {
      OPW.log({
        message: 'Attempting to get invalid configuration type',
        type: 'error',
      });
      return;
    }

    // Set up for return value
    var value = '';

    // Check key exists in defaults
    if (
        (!opw.hasOwnProperty(k1))
        || (k2 && !opw[k1].hasOwnProperty(k2))
        || (k3 && !opw[k1][k2].hasOwnProperty(k3))
       ) {
      OPW.log({
        message: 'Attempting to get invalid nested configuration key',
        type: 'error',
      });
      return;
    }

    // Check for key & value in Singletons
    /*
    if (XXX) {
      OPW.log({
        message: 'Attempting to get invalid configuration value',
        type: 'error',
        data: {k1: k1, k2: k2, k3: k3},
      });
      return opw[key];
    }
    */

    // Check for key & value in Meteor.settings.public
    if (Meteor.settings['public'].hasOwnProperty('opw')) {
      if (Meteor.settings['public']['opw'].hasOwnProperty(k1)) {
        if (k2 && Meteor.settings['public']['opw'][k1].hasOwnProperty(k2)) {
          if (k3 && Meteor.settings['public']['opw'][k1][k2].hasOwnProperty(k3)) {
            return Meteor.settings['public']['opw'][k1][k2][k3];
          }
          return Meteor.settings['public']['opw'][k1][k2];
        }
        return Meteor.settings['public']['opw'][k1];
      }
    }

    // Check for key & value in Meteor.settings.opw
    if (Meteor.settings.hasOwnProperty('opw')) {
      if (Meteor.settings.opw.hasOwnProperty(k1)) {
        if (k2 && Meteor.settings.opw[k1].hasOwnProperty(k2)) {
          if (k3 && Meteor.settings.opw[k1][k2].hasOwnProperty(k3)) {
            return Meteor.settings.opw[k1][k2][k3];
          }
          return Meteor.settings.opw[k1][k2];
        }
        return Meteor.settings.opw[k1];
      }
    }

    // If all else fails, return default
    return (k1 && k2 && k3)
      ? opw[k1[k2]][k3]
      : (k1 && k2)
        ? opw[k1][k2]
        : opw[k1];

  },


  /***************************************************************************
   *
   * @Summary         Gets log entries, regardless of read status
   * @Method          getRawLog
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getRawLog: function (fetch) {

    // Locals
    fetch = ('boolean' == typeof (fetch))
      ? fetch : true;

      // Do it
    return (fetch) ? (
      opwLog.find({}, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {date: -1},
      }).fetch()
    ) : (
      opwLog.find({}, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {date: -1},
      })
    )

  },


  /***************************************************************************
   *
   * @Summary         Get full document for a row by _id
   * @Method          getRowById
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getRowById: function(id, fetch) {

    // Validate
    if (id && !OPW.isCollectionId(id)) {
      OPW.log({
        message: 'Invalid attempt to get row',
        type: 'error',
        data: {id: id, fetch: fetch},
      });
      return false;
    }

    // Locals
    fetch   = (OPW.isBoolean(fetch)) ? fetch : true;

    // Pretty sure this was pointless
    // ... or it may have been for the installer?
    // var row = OPW.getRowById(id) || Blaze.toHTML('opwEditorContentExample');

    // Do it
    return (fetch) ? (
        opwRows.findOne({_id: id})
    ) : (
        opwRows.find({_id: id})
    )

  },


  /***************************************************************************
   *
   * @Summary         Gets the value of a row's order field by document ID
   * @Method          getRowOrderById
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getRowOrderById: function(id) {

    // Validate
    if (!OPW.isCollectionId(id)) {
      OPW.log({
        message: 'Invalid ID encountered trying to get row order.',
        type: 'error',
        data: {
          id: id
        },
      });
      return;
    }

    var row = OPW.getRowById(id);
    var order = (row && row.order) ? row.order : false;
    OPW.log({
      message: 'Getting row ' + id + ' by ID.',
      type: 'debug',
      data: {
        row: row,
        order: order,
      }
    });
    return order;

  },


  /***************************************************************************
   *
   * @Summary         Get active non-home rows
   * @Method          getRows
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *  This gets the currently active rows for display
   *    (not any of: home, stale, removed)
   *
   *  TODO:  Integrate sortables / sort order
   * ************************************************************************/

  getRows: function(limit, fetch) {

    // Locals
    limit           = limit || OPW.getNestedConfig('numerics', 'menuItemMaxCount');
    limit           = (OPW.isNumber(limit))
                      ? limit : OPW.getNestedConfig('numerics', 'menuItemMaxCount');
    fetch           = ('boolean' == typeof (fetch))
                      ? fetch : true;
    var selector    = {
      removed:    {$ne: true},
      slug:       {$ne: 'top'},
      stale:      {$ne: true},
    }
    var projection  = {
      limit:      limit,
      sort:       {order: 1},
      // sort:       {'stamps.created': 1},
    };

    // Do it
    return (fetch) ? (
        opwRows.find(selector, projection).fetch()
    ) : (
        opwRows.find(selector, projection)
    )
  },


  /***************************************************************************
   *
   * @Summary         Gets unread security related entries from the log
   * @Method          getSecurityLog
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getSecurityLog: function(fetch) {

    // Locals
    fetch = ('boolean' == typeof (fetch))
      ? fetch : true;
    selector = {
      read: {$ne: true},
      security: true,
    };

    // Do it
    return (fetch) ? (
      opwLog.find(selector, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {date: -1},
      }).fetch()
    ) : (
      opwLog.find(selector, {
        limit: OPW.getNestedConfig('numerics', 'publishLimit'),
        sort: {date: -1},
      })
    )

  },


  /***************************************************************************
   *
   * @Summary         Gets current site title from config
   * @Method          getSiteTitle
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      TODO:       Check for database config first
   *
   * ************************************************************************/

  getSiteTitle: function() {
    return OPW.getConfig('title') || '#OnePageWonder by @iDoMeteor';
  },


  /***************************************************************************
   *
   * @Summary         Gets value of string from config
   * @Method          getSiteTitle
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * TODO:
   *      Should probably use getNestedConfig, otherwise it would probably
   *      not grab values dynamically
   *
   * ************************************************************************/

  getString: function(key) {

    // Validate
    if (!OPW.isString(key)) {
      OPW.log({
        message: 'Attempting to get invalid string',
        type: 'error',
        data: key,
      });
      return '';
    }

    // Do it
    return (OPW.getNestedConfig('strings', key))
        ? OPW.getNestedConfig('strings', key)
        : (
            OPW.log({
              message: 'Attempting to get invalid string',
              type: 'error',
              data: key,
            }),
            ''
        );

  },


  /***************************************************************************
   *
   * @Summary         Gets current connection IP from iDM CL
   * @Method          getUserIp
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  getUserIp: function() {
    return UI._globalHelpers.currentIp();
  },


  /***************************************************************************
   *
   * @Summary         Converts a CSS ID to string
   * @Method          idToString
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * Used mostly for changing inline contact form IDs to log labels
   *
   * ************************************************************************/

  idToString: function(id) {

    // Validate
    if (!OPW.isString(id)) {
      OPW.log({
        message: 'Invalid attempt to convert ID to string',
        type: 'error',
      });
      return;
    }

    // Locals
    var arr = [];
    var str = '';

    // Split & cap first letters or OPW
    _.each(id.split('-'), function (v) {
      if ('idm' == v) {
        arr.push('iDM');
      } else if ('opw' == v) {
        arr.push('OPW');
      } else {
        arr.push(
          v.charAt(0).toUpperCase()
          + v.substr(1)
        );
      }
    });

    // Join into string & return
    return arr.join(' ');

  },


  /***************************************************************************
   *
   * @Summary         Initializes the #OnePageWonder database on first run
   * @Method          init
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * Initialize the database with instructional home row any time there
   * are no active (neither removed or stale set) home rows in the database
   * collection.
   *
   * TODO:
   *      Value of content should become a blaze render function that
   *        returns the contents of the help template... does not
   *        work, Template is not defined and I haven't figured out
   *        how to solve that w/o any stupid hacks yet.
   *      May want to refactor this into initHomeRow and also process
   *        the configuration defaults here, if there are no configuration
   *        singletons.
   *
   * ************************************************************************/

  init: function() {

    // var content = Blaze.toHTML(Template.opwDefaultContent);
    var selector = {
      removed: {$ne: true},
      stale: {$ne: true},
    }

    if (0 == opwRows.find(selector).count()) {
      opwRows.insert({
        content: opwDefaultContent,
        slug: 'top',
        stamps: {
          created: new Date(),
        },
      }, function(error, id) {
        (id)
          ? OPW.log({
              message: 'Initialized default home row',
              type: 'success',
              notifyAdmin: true,
            })
          : OPW.log({
              message: 'Failed to initialize default home row',
              type: 'error',
              notifyAdmin: true,
            })
      });
    }

  },


  /***************************************************************************
   *
   * @Summary         Inserts a validated contact into the database
   * @Method          insertContact
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      While it might seem appropriate to provide a callback parameter
   *      for this method, we are going to pass the contextual state through
   *      the template instance.  User feedback and related DOM handling are
   *      handled intelligently below, allowing for some flexibility.
   *
   * TODO: Send email/admin notification!
   *
   * ************************************************************************/

  insertContact: function(submission, template) {

    // Validate
    if (!OPW.isTemplateInstance(template)) {
      OPW.log({
        message: 'Invalid template while trying to insert contact.',
        type: 'error',
      });
      return false;
    }
    if (!OPW.isValidContactSubmission(submission)) {
      OPW.log({
        message: 'Invalid submission encountered trying to insert contact.',
        type: 'error',
        data: submission,
      });
      return false;
    }

    // Locals
    var context         = template;
    var contact         = submission;
    var target          = $(context.find('form').closest('.opw-contact'));

    // Additions
    contact.stamp   = new Date();
    contact.source  = OPW.getUserIp();

    // Mods
    contact.label = OPW.idToString(contact.label);

    // Debug
    OPW.log({
      message: 'Source IP requesting contact: ' + contact.source,
      type: 'debug',
      data: submission,
    });

    // Check for dupes
    // This has to run on the server since we don't publish the contact
    // log to the client unless the admin is logged in.
    Meteor.call('opwContactExists', contact,
                function opwContactExistsCallback (error, result) {

      // Result is an object with three possible keys:
      //  error: true if an error occurred during queries
      //  isDuplicate: boolean, whether or not the contact passed unique test
      //  message: message for logger / feedback

      if (error || result.error) {
        OPW.log({
          message: (result.message)
            ? result.message
            : 'Error checking for duplicate requests, please try again.',
          type: 'error',
          sendEvent: true,
          notifyUser: true,
        });
        return;
      }

      if (result.isDuplicate) {

        // Contact is a duplicate request

        // Notify user
        OPW.log({
          message: result.message,
          type: 'danger',
          sendEvent: true,
          notifyUser: true,
        });

        // Update UI
        if (contact.message) {
          // Process modal based contact form
          $('#opw-detailed-contact-modal').modal('hide');
        } else {
          // Process row based contact form
          $(context.find('.opw-contact-input')).focus();
        }

      } else if (result.consolidate) {

        Meteor.call('opwLogConsolidateContactRequest', result.id, contact,
          function opwUpdateContactCb(error, affected) {

            if (affected) {

              // Success
              if (contact.message) {
                $('#opw-detailed-contact-modal').modal('hide');
              } else {
                // Remove contact form
                target.children().remove();
                // Render thank you
                UI.render(Template.opwContactThankYou, target.get(0));
              }

              // Provide feedback & log
              OPW.log({
                message: OPW.getNestedConfig('contact', 'thankYouAlert'),
                type: 'success',
                sendEvent: true,
                notifyUser: true,
                data: contact
              });

            } else {

              // Technical failure
              OPW.log({
                message: 'Could not consolidate your requests,'
                  + ' please try again.',
                type: 'error',
                sendEvent: true,
                notifyAdmin: true,
                notifyUser: true,
                data: {
                  contact: contact,
                  error: error,
                  affected: affected,
                },
              });

            }

          return;

          }
       );


      } else {

        // Contact is unique, attempt to insert
        opwContacts.insert(contact, function opwInsertContactCb(error, id) {

          if (id) {

            // Success
            if (contact.message) {
              $('#opw-detailed-contact-modal').modal('hide');
            } else {
              // Remove contact form
              target.children().remove();
              // Render thank you
              UI.render(Template.opwContactThankYou, target.get(0));
            }

            // Provide feedback & log
            OPW.log({
              message: OPW.getNestedConfig('contact', 'thankYouAlert'),
              type: 'success',
              sendEvent: true,
              notifyAdmin: true,
              notifyUser: true,
              data: contact
            });

          } else {

            // Technical failure
            OPW.log({
              message: 'Could not insert your request, please try again.',
              type: 'error',
              sendEvent: true,
              notifyAdmin: true,
              notifyUser: true,
              data: contact
            });

          }

          return;

        }); // End opwInsertContactCallback

      }

      return; // End opwContactExistsCallback

    });

    return; // End opwInsertContact

  },


  /***************************************************************************
   *
   * @Summary         Inserts a new row, generally from the editor
   * @Method          insertRow
   * @Param           n/a
   * @Returns         undefined
   * @Callback
   * @Location        Client, Server
   *
   * @Description
   *
   * TODO: Make default order a numeric setting
   *
   * ************************************************************************/

  insertRow: function(obj, callback) {

    var cb = callback;
    var views = null;

    // Permissions check
    if (!Meteor.userId()) {
      message = 'You may not add rows unless you are logged in.';
      OPW.log({
        message: message,
        notifyUser: true,
        type: 'security',
      });
      OPW.returnCall(callback, message);
      return;
    }

    // Validate
    if (!obj.content || !OPW.isValidContent(obj.content)) {
      message = 'Invalid content encountered while attempting to insert row.';
      OPW.log({
        message: message,
        notifyUser: true,
        type: 'warning',
      });
      OPW.returnCall(callback, message);
      return;
    }
    if (!obj.isTop
        && (!obj.title
        || !OPW.isValidTitle(obj.title))
     ) {
       message = 'Invalid title encountered while attempting to insert row.';
       OPW.log({
         message: message,
         notifyUser: true,
         type: 'warning',
       });
      OPW.returnCall(callback, message);
      return;
     }

    // Validate or correct
    if (obj.isTop) {
      obj.order = 0;
    } else if (!obj.order || !OPW.isNumber(obj.order)) {
      // Find highest order and add 1 to it, making this the last row
      obj.order = opwRows.findOne({
        removed:    {$ne: true},
        stale:      {$ne: true},
      }, {
        fields: {order: 1},
        sort: {order: -1},
      }).order + 1;
    }
    if (obj.previous && OPW.isCollectionId(obj.previous)) {
      // Perpetuate section view counts
      views = opwRows.findOne(obj.previous).views;
      if (views) obj.views = views;
    } else {
      obj.previous = undefined;
    }
    if (!obj.slug || !OPW.isValidSlug(obj.slug)) {
      obj.slug = OPW.stringToSlug(obj.title);
    }

    // Stamp it
    obj.stamps = { created: new Date() };

    // Save to database
    opwRows.insert (obj, function insertRowCallback (error, id) {

      OPW.log ({
        message: 'Tried to insert row.',
        type: 'debug',
        data: {
          error: error,
          id: id,
          obj: obj,
          cb: typeof(cb),
        },
      });
      // Ensure proper row order
      OPW.packRowOrders()
      // Return results to origin or into the void
      OPW.returnCall(cb, error, id);
      return;

    });

    return;  // End insertRow

  },


  /***************************************************************************
   *
   * @Summary         Uses CSS ID to choose & insert a Wonderbar Element
   * @Method          insertWonderBarElement
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * ************************************************************************/

  insertWonderBarElement: function(id) {

    // Validate
    if (!OPW.isString(id)) {
      OPW.log({
        message: 'Invalid attempt to insert toolbar element.',
        type: 'error',
      });
      return false;
    }

    // Locals
    var element  = OPW.idToElementName(id);
    var template = 'opwElement' + element;

    // Debug
    OPW.log({
      message: 'Attempting to insert WonderBar element.',
      type: 'debug',
      data: {
        element: element,
        id: id,
        template: template,
      },
    });

    // Some action
    // TODO: Allow things like bolding in place, but for now
    // we are just going to insert at cursor position or after
    // a selected bit of text on a new line.
    var target = $('#opw-editor-textarea');
    var start = target.prop('selectionStart');
    var end = target.prop('selectionEnd');
    var selection = (start == end) ? false : true;
    var insert = '\n'
        + Blaze.toHTML(Template[template])
        + '\n';
    var before = '';
    var after = '';
    var value = '';

    // Debug
    OPW.log({
      message: 'Attempting to insert #WonderBar element',
      type: 'debug',
      data: {
        start: start,
        end: end,
        selection: selection,
      },
    });

    // Append to empty area or insert at cursor on new lines
    if (!start && !selection) {
      // There is nothing in the textarea
      value = target.val() + insert;
    } else {
      // Put it after the cursor or selectione end
      before = target.val().substr(0, end);
      after = target.val().substr(end);
      value = before + insert + after;
    }

    // Update textarea value
    target.val(value);

  },


  /***************************************************************************
   *
   * @Summary         Determines navigational style and hooks up scroll events
   * @Method          instantiateNavigation
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  instantiateNavigation: function() {

    // Locals
    var style = (
        opw
        && OPW.isObject(OPW.getConfig('navigation'))
        && OPW.isString(OPW.getNestedConfig('navigation', 'style'))
    ) ? (
        'instantiateNavigation' + OPW.getNestedConfig('navigation', 'style')
    ) : (
        OPW.log({
          message: 'Invalid navigation style detected, falling back to horizontal standard.',
          type: 'error',
        }),
        'instantiateNavigationHorizontal'
    );

    // All navigation styles hook into Bootspy, set it up
    $('body').attr('data-spy', 'scroll');
    $('body').css('position', 'relative');
    $('body').attr('data-target', '#opw-navigation');
    $('body').scrollspy({target: '#opw-navigation' });

    // Assign page scroll events
    $('.page-scroll').bind('click', OPW.scrollToHref);

    // Style specific instantiations
    OPW[style]();

  },


  /***************************************************************************
   *
   * @Summary         Sets up specifics of BS horizontal navgiation
   * @Method          instantiateNavigationHorizontal
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *  TODO:
   *     Still feel like collapse offset should be read from the DOM rather
   *     than from the config
   *
   * ************************************************************************/

  instantiateNavigationHorizontal: function() {

    // Collapse navbar header when not at top
    $(window).scroll(function () {
      if (OPW.getNestedConfig('navigation', 'collapseOffset') < $('#opw-primary-nav').offset().top) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
        $('body').addClass('opw-body-less-padding');
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
        $('body').removeClass('opw-body-less-padding');
      }
    });

  },


  /***************************************************************************
   *
   * @Summary         Sets up MeteorPress style navigation environment
   * @Method          instantiateNavigationMeteorPress
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *  TODO
   *
   * ************************************************************************/

  instantiateNavigationMeteorPress: function() {
    return;
  },


  /***************************************************************************
   *
   * @Summary         Performs set up for the scrolling menu system
   * @Method          instantiateNavigationScrolling
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      TODO
   *
   * ************************************************************************/

  instantiateNavigationScrolling: function() {

    return;
    OPW.sm();
    var anchors = [
            {
              backgroundColor: "#00f",
              className: "opw-sm",
              label: "Test",
            },
        ]
    var template = Blaze.toHTML(Template.opwSM);
    var options = {
      anchorSetup: anchors,
      sectionClass: 'opw-sm',
    }
    var opwScrollMenu = ScrollMenu(options);
    OPW.log(JSON.stringify(opwScrollMenu, null, 2));

  },


  /***************************************************************************
   *
   * @Summary         Hook up events and environment for BS stacked pills
   * @Method          instantiateNavigationStacked
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      TODO
   *              Fix classes for side menu
   *
   * ************************************************************************/

  instantiateNavigationStacked: function() {

    return;

  },


  /***************************************************************************
   *
   * @Summary         Check connection log for this an IP
   * @Method          ipExists
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Returns true if checked IP exists in the iDM connection log
   *
   * ************************************************************************/

  ipExists: function(ip) {

    // Validate IP & check for dupe
    if (OPW.isValidIp(ip)) {
      return (idmConnectionLog.find({source: ip}).count());
    } else {
      OPW.log({
        message: 'Invalid IP when checking for duplicates.',
        type: 'error',
      });
      return false;
    }

  },


  /***************************************************************************
   *
   * @Summary         Checks contact log for current user's IP
   * @Method          ipIsInContacts
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  ipIsInContacts: function(ip) {

    ip = ip || Meteor.userIp;
    if (OPW.isValidIp(ip)) {
      return (opwContacts.find({source: ip}).count());
    } else {
      OPW.log({
        message: 'Invalid IP when checking for duplicates.',
        type: 'error',
      });
      return false;
    }

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is of type Boolean
   * @Method          isBoolean
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isBoolean: function(value) {
    return ('boolean' == typeof (value))
        ? true
        : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a string matching a Mongo ID
   * @Method          isCollectionId
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isCollectionId: function(value) {
    return (
      (/^\x{24}$/.test(value))
      || (/^\w{17}$/.test(value))
    )
      ? true
      : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is of type date
   * @Method          isDate
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isDate: function(value) {
    return ('date' == typeof (value))
        ? true
        : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is of type Function
   * @Method          isFunction
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   *
   * ************************************************************************/

  isFunction: function(value) {
    return ('function' == typeof (value))
        ? true
        : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if param is a string of digits, possibly negative
   * @Method          isNumber
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isNumber: function(value) {
    return (
      ('number' == typeof (value))
        || (/^-?[0-9]?$/.test(value))
    )
      ? true
      : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is of type Object
   * @Method          isObject
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isObject: function(value) {
    return ('object' == typeof (value))
        ? true
        : false;
  },


  /***************************************************************************
   *
   * @Summary         Determines if the footer is in static or scrolls off
   * @Method          isStaticFooterShowing
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isStaticFooterShowing: function() {
    return (
        (OPW.getNestedConfig('footer', 'show'))
        && (!OPW.getNestedConfig('footer', 'fixed'))
    ) ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is of type String
   * @Method          isString
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isString: function(value) {
    return ('string' == typeof (value))
        ? true
        : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if Blaze thinks the parameter is a template
   * @Method          isTemplate
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isTemplate: function(value) {
    return (Blaze.isTemplate(value));
  },


  /***************************************************************************
   *
   * @Summary         Checks if the parameter is a template instance
   * @Method          isTemplateInstance
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isTemplateInstance: function(value) {
    return value instanceof Blaze.TemplateInstance;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid email or Twitter address
   * @Method          isNotDuplicateContact
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isNotDuplicateContact: function(obj) {

    return;

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid document for insertion
   * @Method          isValidContactDocument
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidContactDocument: function(obj) {

    var whitelist = [
        'label',
        'message',
        'source',
        'stamp',
        'user',
    ]

    if (!OPW.isObject(obj)) return false;

    if (_.omit(obj, whitelist).length) {
      return false;
    }

    // Label
    if (!OPW.isString(obj.label)) return false;

    // Source
    if (!OPW.isValidIp(obj.source)) return false;

    // Stamp
    if (!OPW.isDate(obj.stamp)) return false;

    // Contact
    if (
        (OPW.isValidEmail(obj.user))
        || (OPW.isValidTweeter(obj.user))
    ) return true;

    return false;

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid document for insertion
   * @Method          isValidEmailObject
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * ************************************************************************/

  isValidEmailObject: function(obj) {

    var recips = [];
    var whitelist = [
        'from',
        'message',
        'subject',
        'to',
    ];

    if (!OPW.isObject(obj)) {
      OPW.log({
        message: 'Invalid attempt to test email object',
        type: 'error',
        data: obj,
      });
      return false;
    }

    if (_.omit(obj, whitelist).length) {
      OPW.log({
        message: 'Too many keys in mail object',
        type: 'error',
        data: obj,
      });
      return false;
    }

    // Recips
    if (!OPW.isString(obj.to)) {
      OPW.log({
        message: 'Invalid recipient format checking mail object',
        type: 'error',
        data: obj,
      });
      return false;
    }
    if (obj.to.indexOf(',')) {
      // Multiple recipients
      recips = obj.to.split(',');
      _.each(recips, function (value) {
        value = value.trim();
        if (!OPW.isValidEmail(obj.to)) {
          OPW.log({
            message: 'Invalid recipients encountered checking mail object',
            type: 'error',
            data: obj,
          });
          return false;
        }
      });
    } else {
      // Single recipient
      if (!OPW.isValidEmail(obj.to)) {
        OPW.log({
          message: 'Invalid recipient encountered checking mail object',
          type: 'error',
          data: obj,
        });
        return false;
      }
    }

    // Sender
    if (!OPW.isValidEmail(obj.from)) {
      OPW.log({
        message: 'Invalid sender encountered checking mail object',
        type: 'error',
        data: obj,
      });
      return false;
    }

    // Subject
    if (!OPW.isString(obj.subject)) {
      OPW.log({
        message: 'Invalid subject encountered checking mail object',
        type: 'error',
        data: obj,
      });
      return false;
    }

    // Message
    // Last one, passes if successful
    if (OPW.isString(obj.text)) return true;

    OPW.log({
      message: 'Unknown error encountered checking mail object',
      type: 'error',
      data: obj,
    });
    return false;

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid document for insertion
   * @Method          isValidContactSubmission
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidContactSubmission: function(submission) {

    var whitelist = [
        'label',
        'message',
        'user',
    ]

    if (!OPW.isObject(submission)) return false;

    if (_.omit(submission, whitelist).length) {
      return false;
    }

    // Label
    if (!OPW.isString(submission.label)) return false;

    // User
    if (
        (OPW.isValidEmail(submission.user))
        || (OPW.isValidTweeter(submission.user))
    ) return true;

    return false;

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is row content
   * @Method          isValidContent
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidContent: function(value) {
    return (
        ('string' == typeof (value))
        && (0 < value.length)
    ) ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid email, intranet friendly
   * @Method          isValidEmail
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidEmail: function(value) {
    if (!OPW.isString(value)) return false;
    value = value.trim();
    return (/^.{1,255}\@[\w-.]{1,255}$/.test(value))
        ? true
        : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid email or Twitter address
   * @Method          isValidEmailOrTwitter
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * Tests a subject (contact submission) to ensure it is either
   * a valid Twitter handle or email address (intranets supported)
   * and if so, returns true if the client's IP is not already
   * in the contact log or false otherwise.
   *
   * ************************************************************************/

  isValidEmailOrTwitter: function(value) {

    // Validate type
    if (!OPW.isString(value)) return;
    // Validate Twitter nick or email
    return (OPW.isValidTweeter(value) || OPW.isValidEmail(value))
        ? true : false;

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter matches an IPv4 address
   * @Method          isValidIp
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidIp: function(value) {
    if (!OPW.isString(value)) return false;
    value = value.trim();
    return (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value))
        ? true
        : false;
  },

  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid mail object
   * @Method          isValidLogObject
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidLogObject: function(value) {

    // Validate
    if (!OPW.isObject(value)) {
      OPW.log({
        data: value,
        message: 'Attempting to validate improperly formatted log object',
        type: 'error',
      });
      return false;
    }

    // Sanitize keys
    var whitelist = _.pick(value,
                           'auth',
                           'alertType',
                           'date',
                           'data',
                           'eventTag',
                           'message',
                           'notifyAdmin',
                           'notifyUser',
                           'security',
                           'sendEvent',
                           'source',
                           'type'
                          );

    // Check for additions
    if (_.keys(whitelist).length < _.keys(value).length) {
      OPW.log({
        data: value,
        message: 'Too many keys detected in log object!',
        type: 'security',
      });
      return false;
    }

    return  true;

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid mail object
   * @Method          isValidMailObject
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidMailObject: function(value) {

    // Validate
    if (!OPW.isObject(value)) {
      OPW.log({
        message: 'Attempting to validate improperly formatted mail object.',
        type: 'error',
        data: value,
      });
      return false;
    }

    // Sanitize keys
    var whitelist = _.pick(value, 'to', 'from', 'subject', 'text');

    // Check for additions
    if (_.keys(whitelist).length < _.keys(value).length) {
      OPW.log({
        data: value,
        message: 'Too many keys detected in mail object!',
        type: 'security',
      });
      return false;
    }

    // Lazyyyy
    return (
        (OPW.isValidEmail(whitelist.to))
        && (OPW.isValidEmail(whitelist.from))
        && (OPW.isString(whitelist.subject))
        && (OPW.isString(whitelist.text))
    ) ? (
        true
    ) : (
        OPW.log({
          message: 'Validating mail object failed.',
          type: 'error',
          data: value,
        }),
        false
    )

  },


  /***************************************************************************
   *
   * @Summary         Lazily (for me) checks the format of a row object
   * @Method          isValidRowObject
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *  TODO:
   *      Remove some of the optionals and make them required once migrated
   *      Properly validate previous, slug, title
   *      I don't really like Match, but we'll see..maybe I'll change my mind
   * ************************************************************************/

  isValidRowObject: function(obj) {

      if (Match.test(obj, {
        _id: Match.Optional(String),
        content: Match.Optional(String),
        isTop: Match.Optional(Boolean),
        order: Match.Optional(Match.Integer),
        previous: Match.Optional(String),
        removed: Match.Optional(Boolean),
        slug: Match.Optional(String),
        stale: Match.Optional(Boolean),
        stamps: Match.Optional(Match.OneOf(Date, Object)),
        title: Match.Optional(String),
        views: Match.Optional(Match.Integer),
      })) {
        return true;
      } else {
        return false;
      }

  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a string matching a valid slug
   * @Method          isValidSlug
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *   Tests subject for slug validity (alphanumeric + _ or -)
   *
   * ************************************************************************/

  isValidSlug: function(value) {
    if (!OPW.isString(value)) return false;
    if (!value.trim().length) return false;
    return (
        (/[^\w\._~-]/.test(value))
        || (/--/.test(value))
    ) ? false : true;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is valid navigation title
   * @Method          isValidTitle
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidTitle: function(value) {
    return (
        ('string' == typeof (value))
        && (0 < value.length)
        && (OPW.getNestedConfig('numerics', 'menuItemMaxLength') > value.length)
    ) ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Checks if parameter is a valid Twitter handle
   * @Method          isValidTweeter
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  isValidTweeter: function(value) {
    if (!OPW.isString(value)) return false;
    value = value.trim();
    return (/^@\w{1,15}$/.test(value))
        ? true
        : false;
  },


  /*****************
   *
   */

  kadiraEnabled: function() {
    return (
        OPW.getNestedConfig('kadira', 'enable')
        && OPW.getNestedConfig('kadira', 'secret')
        && OPW.getNestedConfig('kadira', 'key')
    )
    ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Logger of console messages & alerts..if convienent
   * @Method          log
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *            Options (ordered here in relative priority for use)
   *                  message
   *                    Text string possibly sent to user, console and/or db
   *                  type
   *                      * No type will ever alter notifyUser or data
   *                      critical
   *                      danger
   *                      deprecated
   *                      error
   *                      event
   *                      failure
   *                      info
   *                      security
   *                      success
   *                      warning
   *                  sendEvent
   *                    For native GA support (temporarily missing)
   *                  eventTag
   *                    For native GA support (temporarily missing)
   *                  auth
   *                    Adds to auth log & adds notifyAdmin flag based on config
   *                  security
   *                    Adds to security log & adds notifyAdmin flag
   *                  notifyUser
   *                    Pops a BS alert with appropriate BG color
   *                  notifyAdmin
   *                    Adds to admin log & sends email
   *                  data
   *            All types set an appropriate alertType (BS alert context), so
   *              that if notifyUser flag is passed it will be handled properly.
   *
   *  TODO:
   *          Not all messages need to be stringified,
   *          Fix when putting in data object check
   *          Doc what each type does
   *          Refactor the if statements for each log type into a method using
   *            config arrays for:
   *              logToBothConsoles
   *              logToClientConsoleOnly
   *              logToServerConsoleOnly
   *              logToLog
   *
   * ************************************************************************/

  log: function(options) {

    var chop        = 'debug'; // Default type if not passed
    var debug       = OPW.getNestedConfig('log', 'debug');
    var wood        = {};
    var log         = {};
    // Process message for console & set BS alert context
    var logJam = {

      critical: function(obj) {
        // Something bad happened, admin should be notified
        message = 'OPW CRITICAL ERROR: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'danger';
        obj.notifyAdmin = true;
        return obj;
      },

      danger: function(obj) {
        // Most likely a user mistake, no need to modify flags
        message = 'OPW DANGER: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'danger';
        return obj;
      },

      deprecated: function(obj) {
        // Non-critical error, such as failure to insert valid object
        message = 'OPW DEPRECATED LOG CALL: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'danger';
        return obj;
      },

      debug: function(obj) {
        // Never saved or sent to admin/user, only console if debug enabled
        message = 'OPW DEBUG: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'info';
        obj.notifyAdmin = false;
        obj.notifyUser  = false;
        obj.sendEvent   = false;
        return obj;
      },

      deployed: function(obj) {
        // TODO: Send rollbar deployment
        message = 'OPW DEPLOYMENT: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'success';
        obj.sendEvent   = true;
        return obj;
      },

      error: function(obj) {
        // Non-critical error, such as failure to insert valid object
        message = 'OPW ERROR: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'danger';
        obj.notifyAdmin = true;
        return obj;
      },

      event: function(obj) {
        // A standard action worthy of sending to GA
        // TODO: Probably should give event specific options
        message = 'OPW EVENT: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'info';
        obj.sendEvent   = true;
        return obj;
      },

      failure: function(obj) {
        // Something bad happened, probably programmer error :>
        message = 'OPW FAILURE: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'danger';
        obj.notifyAdmin = true;
        return obj;
      },

      info: function(obj) {
        // Info probably being passed to user, nothing to get excited about
        message = 'OPW INFO: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'info';
        return obj;
      },

      pageview: function(obj) {
        // For logging page/section views to GA
        // TODO: Probably should give specific options
        message = 'OPW PAGEVIEW: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'info';
        obj.sendEvent   = true;
        return obj;
      },

      security: function(obj) {
        // Security related issue, notify admin!
        message = 'OPW SECURITY: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType   = 'danger';
        obj.notifyAdmin = true;
        obj.security    = true;
        return obj;
      },

      success: function(obj) {
        // It's all good! \o/
        message = 'OPW SUCCESS: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType = 'success';
        return obj;
      },

      warning: function(obj) {
        // Probably warning user, maybe a non-critical program error
        message = 'OPW WARNING: '
          + JSON.stringify(obj, null, 2);
        OPW.logToLogOrNot(message);
        obj.alertType = 'danger';
        return obj;
      },

    };

    var useGAEvent    = (
        OPW.getNestedConfig('google', 'enable')
        && OPW.getNestedConfig('google', 'sendLogEvents')
    ) ? true : false;
    var useRollbarEvent    = (
        OPW.getNestedConfig('rollbar', 'enable')
        && OPW.getNestedConfig('rollbar', 'sendLogEvents')
    ) ? true : false;
    var userId      = 'Anonymous User'; // TODO: Pass in user ID
    var type        = null;

    if (OPW.isObject(options)) {

      // Validate
      wood.message        = (OPW.isString(options.message))
                          ? options.message : 'Invalid message';
      wood.data           = (OPW.isString(options.data) || OPW.isObject(options.data))
                          ? options.data : null;
      wood.date           = new Date();
      wood.notifyAdmin    = (OPW.isBoolean(options.notifyAdmin))
                          ? options.notifyAdmin : false;
      wood.notifyUser     = (OPW.isBoolean(options.notifyUser))
                          ? options.notifyUser : false;
      wood.sendEvent      = (OPW.isBoolean(options.sendEvent))
                          ? options.sendEvent : false;
      wood.eventTag       = (OPW.isString(options.eventTag))
                          ? options.eventTag : 'OPW Log Event';
      wood.auth           = (OPW.isBoolean(options.auth))
                          ? options.auth : false;
      wood.security       = (OPW.isBoolean(options.security))
                          ? options.security : false;
      wood.type           = (
                              (type = options.type)
                              && ('function' == typeof (logJam[type]))
                          ) ? type : 'critical';
      chop                = wood.type;

    } else if (OPW.isString(options)) {
      // Deprecated form, take it but complain about it
      wood.message = options;
      wood.type    = 'deprecated';
    } else {
      // Options passed were not an object or string, abort
      message = '#OPW ERROR Invalid call to logger';
      OPW.logToLogOrNot(message);
      return false;
    }

    // BzzzzZZZzzzzzZZZZzzz
    log = logJam[chop](wood);

    // Log to database
    if (
      ('debug' != log.type)
      && (OPW.getNestedConfig('log', 'logLogs'))
    ) {
      opwLog.insert(log);
    }

    // Notify admin if requested
    if (log.notifyAdmin) {
      OPW.notifyAdmin(log);
    }

    // Send events
    if (log.sendEvent) {

      // Google Analytics
      // if (useGAEvent) idmGA.event('Log', log.type, null, null, log);
      // Rollbar
      // if (useRollbar)

    }

    // Notify user if desired
    if (log.notifyUser && Meteor.isClient) {
      OPW.popAlert(log.message, log.alertType);
    }

    return;

  },


  /***************************************************************************
   *
   * @Summary         Decides whether or not to console.log from the logger
   * @Method          logToLogOrNot
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *    If debug is set, it will always log.
   *    If on the client, it checks config for clientSideConsoleLogs value.
   *    If on server, it will log.
   *
   * ************************************************************************/

  logToLogOrNot: function(message) {

    if (OPW.getNestedConfig('log', 'debug')) {
      console.log(message);
      return;
    }

    if (
      Meteor.isClient
      && OPW.getNestedConfig('log', 'clientSideConsoleLogs')
     ){
      console.log(message);
      return;
    }

    if (Meteor.isServer) {
      console.log(message);
      return;
    }

  },


  /***************************************************************************
   *
   * @Summary         logAdminNotification
   * @Method          navigationAdded
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  logAdminNotification: function(data) {

    // Validate
    if (!OPW.isObject(data)) {
      OPW.log({
        message: 'Attempting to log invalid object',
        type: 'error',
      });
    }

    // Log it
    // TODO: May want to Meteor method this so only
    //       OPW can insert
    opwAdminNotificationLog.insert(data);

  },


  /***************************************************************************
   *
   * @Summary         Increments a section's view count when passed a slug
   * @Method          logSectionView
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client
   *
   * @Description
   *
   *      This only operates on active rows
   *
   * ************************************************************************/

  logSectionView: function(slug) {

    // Validate
    if (!OPW.isValidSlug(slug)) {
      OPW.log({
        message: 'Invalid slug encountered trying to log section view',
        type: 'warning',
        notifyAdmin: true,
        data: {slug: slug},
      });
      return;
    }

    // Locals
    id = OPW.getIdFromSlug(slug);

    Meteor.call('opwLogSectionView', id);
    return;

  },


  /***************************************************************************
   *
   * @Summary         Attempts to log a user in
   * @Method          loginWithPassword
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Accountability logging is taken care of globally in
   *      opw/client/main.js
   *
   * ************************************************************************/

  loginWithPassword: function(email, password) {

    Meteor.loginWithPassword (email, password, function(error) {
      email = (OPW.isString(email)) ? email : 'Invalid email';
      return (error) ? (
          // User message
          OPW.log({
            message: OPW.getString('authenticationLoginFailure'),
            notifyUser: true,
            notifyAdmin: OPW.getNestedConfig('toggles',
                                             'notifyAdminOnLoginFailure'),
            sendEvent: true,
            eventTag: 'Login Failure',
            auth: true,
            security: true,
            type: 'danger',
            data: {
              email: email,
              error: error
            }
          }),
          false
        ) : (
          $('#opw-auth-email').val(''),
          $('#opw-auth-password').val(''),
          $('#opw-authenticate').modal('hide'),
          OPW.log({
            message: OPW.getString('authenticationLoginSuccess'),
            notifyUser: true,
            notifyAdmin: OPW.getNestedConfig('toggles',
                                             'notifyAdminOnLoginSuccess'),
            sendEvent: true,
            eventTag: 'Login Success',
            auth: true,
            type: 'success',
            data: {
              email: email,
              error: error
            }
          }),
          true
        )
    });
  },


  /***************************************************************************
   *
   * @Summary         Not used yet
   * @Method          navigationAdded
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  navigationAdded: function() {
    // TODO: Reactive method called when processing changes to the database/DOM
    return;
  },


  /***************************************************************************
   *
   * @Summary         Not used yet
   * @Method          navigationChanged
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  navigationChanged: function() {
    // TODO: Reactive method called when processing changes to the database/DOM
    return;
  },


  /***************************************************************************
   *
   * @Summary         Not used yet
   * @Method          navigationRemoved
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  navigationRemoved: function() {
    // TODO: Reactive method called when processing changes to the database/DOM
    return;
  },


  /***************************************************************************
   *
   * @Summary         Checks for the existence of rows, yoda style
   * @Method          noRowsExist
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Only tries to check for non-home rows
   *
   * ************************************************************************/

  noRowsExist: function() {
    return (!OPW.getRows().length) ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Logs to the admin notification log & sends an email
   * @Method          notifyAdmin
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  notifyAdmin: function(log, callback) {

    // Validate
    if (!OPW.isObject(log)) {
      message = 'Invalid attempt to notify admin';
      OPW.log({
        message: message,
        type: 'error',
      });
      OPW.returnCall(callback, message);
      return;
    }

    // Locals
    var to      = (OPW.getNestedConfig('contact', 'recips'))
                ? OPW.getNestedConfig('contact', 'recips')
                : Meteor.users.findOne({}, {fields: {email: 1}}).email;
    var from    = to;
    var subject = OPW.getConfig('title') + 'Contact';
    var mail    = {};
    var message = (OPW.isString(log.message)) ? log.message : (
      OPW.log({
        message: 'Attempting to notify admin with invalid message.',
        type: 'error',
        data: log,
      })
    )

    // Validate
    if (!OPW.isValidEmail(to)) {
      message = 'Admin contact has been improperly configured.';
      OPW.log({
        message: message,
        type: 'error',
        data: log,
      });
      if ('function' == typeof(callback)) callback(message);
      return;
    }

    // Formulate mail object
    mail = {
      from: from,
      subject: subject,
      text: message + '\n\nDetails:\n' + JSON.stringify(log, null, 2),
      to: to,
    }

    // Log it
    OPW.logAdminNotification(log);

    // Send it
    // TODO: Throttle these
    if (Meteor.isServer) {
      Email.send(mail);
    } else {
      // Call server side method
      Meteor.call('opwSendMail', mail);
    }

    if ('function' == typeof(callback)) callback(message);
    return;

  },


  /***************************************************************************
   *
   * @Summary         Makes sure active non-home rows are sequentially ordered
   * @Method          packRowOrders
   * @Param           {string}
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * This must run when removing rows and doesn't hurt to run any ol'time.
   *
   * ************************************************************************/

  packRowOrders: function() {

    // Locals
    var order = 1;  // Top row is always 0 and not loaded by getRows
    var rows = OPW.getRows();

    _.each(rows, function (row) {
      OPW.setRowOrder(row._id, order); // Let'er rip, no cb for now
      order++;
    });

    return;

  },


  /***************************************************************************
   *
   * @Summary         Sets the order field of a single row
   * @Method          setRowOrder
   * @Param           {string}
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  setRowOrder: function (id, order, callback) {

    // Validate
    if (!OPW.isCollectionId(id)) {
      message = 'Invalid ID encountered trying to set row order.';
      OPW.log({
        message: message,
        type: 'error',
        data: {
          id: id,
          order: order,
          callback: typeof(callback),
        }
      });
      if (OPW.isFunction(callback)) callback(message);
      return;
    }
    if (!OPW.isNumber(order)) {
      message = 'Invalid order encountered trying to set row order.';
      OPW.log({
        message: message,
        type: 'error',
        data: {
          id: id,
          order: order,
          callback: typeof(callback),
        }
      });
      if (OPW.isFunction(callback)) callback(message);
      return;
    }

    // Execute query
    opwRows.update(id, {$set: {order: order}},
                   function setRowOrderSFC (error, affected) {
      result = (affected) ? (
        OPW.log({
          message: 'Set row ' + id + ' order to ' + order + '.',
          type: 'debug',
        })
      ) : (
        OPW.log({
          message: 'Could not set row ' + id + ' order to ' + order + '.',
          type: 'error',
        })
      )

      // Return to caller
      if (OPW.isFunction(callback)) callback(error, affected);

    });

  },


  /***************************************************************************
   *
   * @Summary         Pops a user alert
   * @Method          popAlert
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  popAlert: function(content, type, duration) {

    // Validate
    if (Meteor.isServer) {
      OPW.log({
        message: 'Trying to pop alert on server.',
        type: 'debug',
        data: {content: content, type: type, duration: duration},
      });
      return false;
    }
    if (!OPW.isString(content)) {
      OPW.log({
        message: 'Invalid attempt to create alert.',
        type: 'error',
        data: {content: content, type: type, duration: duration},
      });
      return false;
    }
    if (!OPW.isString(type)) {
      type = OPW.getNestedConfig('bootstrap', 'alert', 'type');
    }
    if (!OPW.isNumber(duration)) {
      duration = OPW.getNestedConfig('bootstrap', 'alert', 'duration');
    }
    var data = {
      content: content,
      duration: duration,
      type: type,
    }

    // Render editor into DOM w/data
    Blaze.renderWithData(Template.opwAlert, data, $('body')[0]);

  },


  // TODO
  popLightbox: function(options) {
    return;
  },


  /***************************************************************************
   *
   * @Summary         Pops a Bootstrap modal window
   * @Method          popModal
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client
   *
   * ************************************************************************/

  popModal: function(options) {

    // This should only run on the client
    if (Meteor.isServer) {
      OPW.log({
        message: 'Attempting to pop modal from server.',
        type: 'warning',
        data: options,
      });
      return;
    }

    // Validate TODO: Better
    if (!OPW.isObject(options)) {
      OPW.log({
        message: 'Invalid attempt to pop lightbox.',
        type: 'error',
        data: options,
      });
    }
    if (options.template && !Blaze.isTemplate(Template[options.template])) {
      OPW.log({
        message: 'Invalid template passed to lightbox.',
        type: 'error',
        data: options,
      });
    }

    // Render into the DOM
    // Should pop automagically via onRendered hook
    UI.renderWithData(Template.opwModal, options, $('body')[0]);

    return;

  },


  /***************************************************************************
   *
   * @Summary         Opens the editor modal
   * @Method          popModalEditor
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client
   *
   * @Description
   *
   *   TODO:
   *      Consolidate with popModal
   *
   * ************************************************************************/

  popModalEditor: function(options) {

    // This should only run on the client
    if (Meteor.isServer) {
      OPW.log({
        message: 'Attempting to pop modal from server.',
        type: 'warning',
        data: options,
      });
      return;
    }

    // Validate TODO: Better
    if (!OPW.isObject(options)) {
      OPW.log({
        message: 'Invalid attempt to pop lightbox.',
        type: 'error',
        data: options,
      });
    }
    if (options.template && !Blaze.isTemplate(Template[options.template])) {
      OPW.log({
        message: 'Invalid template passed to lightbox.',
        type: 'error',
        data: options,
      });
    }

    // Render into the DOM
    UI.renderWithData(Template.opwModalEditor, options, $('body')[0]);

    return;

  },


  /***************************************************************************
   *
   * @Summary         Checks event to see if control-enter-like key was pressed
   * @Method          pressedControlEnter
   * @Param           event The full event passed as passed into Meteor event
   * @Returns         {boolean}
   * @Location        Client, Server
   *
   * ************************************************************************/

  pressedControlEnter: function(event) {

    if (
        (event)
        && (event.ctrlKey)
        && (event.which)
        && (
            (10 == event.which)
            || (13 == event.which)
        )
    ) {
      return true;
    } else {
      return false;
    }

  },


  /***************************************************************************
   *
   * @Summary         Checks event to see if enter-like key was pressed
   * @Method          pressedEnter
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client
   *
   * ************************************************************************/

  pressedEnter: function(event) {

    var key = (event && event.which) ? event.which : event;
    if (
        (10 == key)
            || (13 == key)
    ) {
      return true;
    } else {
      return false;
    }

  },


  /***************************************************************************
   *
   * @Summary         Checks event or number to see if tab has been pressed
   * @Method          pressedTab
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  pressedTab: function(event) {

    var key = (event && event.which) ? event.which : event;
    if (9 == key) {
      return true;
    } else {
      return false;
    }

  },


  /***************************************************************************
   *
   * @Summary         Removes a row by ID, checks for authenticated user
   * @Method          removeRow
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  removeRow: function(id) {

    // Check perms
    if (!Meteor.userId()) {
      OPW.log({
        message: 'You must be logged in to remove a row.',
        notifyUser: true,
        type: 'error',
      });
      return;
    }

    // Validate
    if (!OPW.isCollectionId(id)) {
      OPW.log({
        message: 'Invalid attempt to remove row.',
        notifyUser: true,
        type: 'error',
      });
      return;
    }

    // Do it
    opwRows.update({
      '_id': id
    }, {
      $set: {
        'removed':          true,
        'stamps.removed':   new Date()
      }
    }, function removeRowCallback (error, affected) {

      (affected) ? (
          OPW.log({
            message: 'Removed row',
            notifyUser: true,
            type: 'success',
            data: {
              affected: affected,
              error: error,
              id: id,
            },
          }),
          // Consolidate row orders
          OPW.packRowOrders()
      ) : (
          OPW.log({
            message: 'Failed to remove row.',
            notifyUser: true,
            type: 'error',
            data: {
              affected: affected,
              error: error,
              id: id,
            },
          })
      );

      return;

    });

    return;

  },


  /*****************
   *
   */

  rollbarD: function() {
    /***
     * Rollbar -- To API
     *
    When a deploy has completed successfully, make an HTTP POST to https://api.rollbar.com/api/1/deploy/ with the following params:

    access_token
        Your post_server_item project access token. Required.
    environment
        Name of the environment being deployed, e.g. "production". Required.
    revision
        Revision number/sha being deployed. If using git, use the full sha. Required.
    local_username
        User who deployed. Optional.
    rollbar_username
        Rollbar username of the user who deployed. Optional.
    comment
        Deploy comment (e.g. what is being deployed). Optional.
    */
    return (
        OPW.getNestedConfig('rollbar', 'enable')
        && OPW.getNestedConfig('rollbar', 'key')
        && OPW.getNestedConfig('rollbar', 'secret')
    ) ? true : false;
  },


  /*****************
   *
   */

  rollbarEnabled: function() {
    return (
        OPW.getNestedConfig('rollbar', 'enable')
        && OPW.getNestedConfig('rollbar', 'key')
        && OPW.getNestedConfig('rollbar', 'secret')
    ) ? true : false;
  },


  /***************************************************************************
   *
   * @Summary         Determines page state for the scroll indicator
   * @Method          scrollIndicatorUpdate
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Control scroll indicator targets upon scroll spy activation
   *
   *      TODO: Change to scroll to top if *close* to bottom
   *            May as well let them scroll upward anytime
   *            & to top when @ bottom
   *            Make this an alias to a function in scroller.js
   *
   * ************************************************************************/

  scrollIndicatorUpdate: function() {

    if (Meteor.isServer) {
      return;
    }

    var first    = 'top';

    // Get array of navigation list elements as sorted by helper
    var sections = $('section');
    var ids      = [];
    var numSecs  = sections.length;

    // Check
    if (2 > numSecs) {
      // Should not have been called in the first place
      OPW.log({message: 'No need for scroll indicator update',
              type: 'debug'});
      return;
    }

    // Formulate ID array
    $(sections).each(function() {
      ids.push($(this).attr('id'));
    });

    // Determine currently active
    var active = $('#opw-navigation')
                    .find('.active')
                    .find('a')
                    .attr('href');
    active = (OPW.isString(active)) ? active.substr(1) : first;

    // Determine active position within section array
    var currentIndex = _.indexOf(ids, active);
    if (-1 == currentIndex) {
      OPW.log({
        message: 'Could not find currently active navigation item within the'
          + ' known good sections.',
        type: 'error',
      });
      return;
    }

    // Determine last
    var last = (OPW.isStaticFooterShowing())
             ? 'opw-footer'
             : ids[ids.length - 1];

    // Determine next
    var next = (currentIndex < numSecs - 1)
        ? ids[currentIndex + 1]
        : false;

    // Determine previous
    var prev = (currentIndex)
        // Booyah
        ? ids[currentIndex - 1]
        : false;

    // Instantiate state object
    var state = {
      active: active,
      first: first,
      last: last,
      next: next,
      prev: prev,
    }

    // Debug
    OPW.log({
      message: 'Scroll indicator state:',
      data: state,
      type: 'debug',
    });

    // Return
    Session.set('opwScrollState', state);
    return state;

  },


  /***************************************************************************
   *
   * @Summary         Automagically scroll to a given href
   * @Method          scrollToHref
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      Animates the DOM scroll to passed href, curries target to optional
   *      callback
   *
   *      TODO: Might want to manually set the active class upon arrival
   *
   * ************************************************************************/


  scrollToHref: function(param, callback) {

    // TODO: Validate

    // Requires jQuery UI w/easing set
    var target = (param && param.target)
      ? $(param.target).attr('href')
      : param;


      // Determine height of navigation bar, if any
      var targetTop = ('#top' == param)
        ? 0
        : ($(target) && $(target).offset() && $(target).offset().top)
        // Don't ask. :>
          ? $(target).offset().top
          : 0;

          // Do it
          $('html, body').stop().animate({
            // TODO: Make dynamic or smarter
            scrollTop: targetTop
          },
          1500,
          'easeInOutExpo',
          (OPW.isFunction(callback)) ? callback(target) : null
                                        );

  },


  /***************************************************************************
   *
   * @Summary         Coming in PR.3 or 1.0.0 final, it will rox0r!!
   * @Method          sm
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  // Sourcery
  sm: function() {

    // MUUAHAHAHA
    return;

  },


  /***************************************************************************
   *
   * @Summary         Makes URL friendly slugs from a string (ie; nav title)
   * @Method          idToElementName
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      TODO: Change to Node transliterate in Meteor 1.3
   *
   * ************************************************************************/

  idToElementName: function(string) {

    // Validate
    if (!OPW.isString(string)) {
      return false;
    }

    // Strip opw-wonderbar
    string = string.substr(14);

    // Split into array at hyphens
    var arr = string.split('-');
    var element = '';

    // Loop array and capatilize each word
    _.each(arr, function (value) {
      element += value.charAt(0).toUpperCase();
      element += value.substr(1);
    });

    OPW.log({
      message: 'Converting ID to Element',
      type: 'debug',
      data: {
        string: string,
        eleement: element,
      }
    });

    return element;

  },


  /***************************************************************************
   *
   * @Summary         Makes URL friendly slugs from a string (ie; nav title)
   * @Method          stringToSlug
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   *      TODO: Change to Node transliterate in Meteor 1.3
   *
   * ************************************************************************/

  stringToSlug: function(string) {

    // Validate
    if (!OPW.isString(string)) {
      return false;
    }
    var slug = string.toLowerCase().trim();

    // Convert non-alpha chars to - cuz I hate typing _
    slug = slug.replace(/[\W]/g, '-');
    // Consolidate multiple hyphens
    slug = slug.replace(/-{2,}/g, '-');

    return slug;

  },


  /***************************************************************************
   *
   * @Summary         Updates row content, must be valid & logged in
   * @Method          updateRow
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * @Description
   *
   * TODO:
   *     This is for pre-v1.0.0-RC.2-final, can be removed
   *
   * ************************************************************************/


  updateRow: function(obj) {

    // Permissions check
    if (!Meteor.userId()) {
      OPW.log({
        message: 'You must be logged in to update rows.',
        data: obj,
        notifyUser: true,
        type: 'security',
      });
      return;
    }

    // Locals
    var modifier    = {};
    var selector    = {};

    var content     = obj.content.trim()        || null;
    var id          = obj.id                    || null;
    var isTop       = obj.isTop                 || null;
    var target      = obj.target                || null;
    var title       = obj.title                 || null;

    var contentParent       = $(target).closest('section');
    var contentElement      = contentParent.find('.opw-row-editor');
    var slug                = OPW.stringToSlug(title)   || 'top';

    if (!isTop) {
      var titleElement    = $('#opw-title-editor');
      var titleParent     = titleElement.parent();
    }

    // Validate
    if (!OPW.isValidContent(content)) {
      OPW.log({
        message: 'Content is invalid.',
        notifyUser: true,
        data: obj,
        type: 'error',
      });
      OPW.invalidContent();
      return;
    };
    if (!OPW.isString(id)) {
      OPW.log({
        message: 'Invalid ID encountered trying to update row.',
        notifyUser: true,
        data: obj,
        type: 'error',
      });
      return;
    };
    if (!OPW.isValidSlug(slug)) {
      OPW.log({
        message: 'Invalid slug encountered trying to update row.',
        notifyUser: true,
        data: obj,
        type: 'error',
      });
      return;
    };
    if (
        (!isTop)
        && (!OPW.isValidTitle(title))
    ) {
      OPW.log({
        message: 'Invalid title encountered trying to update row.',
        notifyUser: true,
        data: obj,
        type: 'error',
      });
      OPW.invalidTitle();
      return;
    };

    // Formulate update objects
    selector._id = id;
    (isTop) ? (
            modifier = {
              $set: {
                content: content,
                slug: slug,
                'stamps.modified': new Date(),
              },
            }
        ) : (
            modifier = {
              $set: {
                content: content,
                slug: slug,
                title: title,
                'stamps.modified': new Date(),
              },
            }
        );

    // Save to database
    opwRows.update (selector, modifier, function(error, affected) {

      if (affected) {
        // Drop textarea parent section
        contentElement.hide('drop', {direction: 'down'}, function() {
          // Remove textarea
          contentParent.children().remove();
          // Insert content
          contentParent.append(
              '<div class="row opw-row-content">'
              + content
              + '</div>'
          );
          // Hide content
          contentParent.find('.opw-row-content').hide();
          // Show content
          contentParent.find('.opw-row-content')
              .show('drop', {direction: 'down'});
        });
        if (!isTop) {
          // Drop input parent section
          titleElement.hide('drop', {direction: 'up'}, function() {

            // Remove input
            titleElement.remove();
            // Insert title
            titleParent.append(
                '<a class="page-scroll" href="#'
                + slug
                + '">'
                + title
                + '</a>'
            );
            // Hide title
            titleParent.find('#' + slug).hide();
            // Assign events
            titleParent.find('#' + slug)
                .bind('click', OPW.scrollToHref);
            // Show title
            titleParent.find('#' + slug)
                .show('drop', {direction: 'up'});

          });
        }
        // Toggle editor icon
        contentParent.find('.fa-floppy-o')
            .switchClass('fa-floppy-o', 'fa-pencil');
        // Refresh scroll spy
        $('body').scrollspy('refresh');
        // Log
        OPW.log ('SUCCESS Updated row content')
      } else {
        // Flash inputs
        OPW.invalidContent();
        OPW.invalidTitle();
        // Set failure message
        OPW.log ('FAILURE Failed to update row content')
      }

      return;

    });

    return;

  },


  /***************************************************************************
   *
   * @Summary         Shows the #OnePageWonder version
   * @Method          version
   * @Param           n/a
   * @Returns         undefined
   * @Location        Client, Server
   *
   * ************************************************************************/

  version: function() {
    return "v1.0.0-PR.1";
  },


}
