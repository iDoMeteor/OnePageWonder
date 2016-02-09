// console.log ('Loading iDoMeteor:DDP-Connection-Log');
/******************************************************************************
 *
 * @iDoMeteor #MeteorJS Connections Log
 * v1.0.0-RC.1
 *
 * @Description
 *
 * File executes in the following order:
 *
 *      Instantiate collections
 *      Instantiate logging object
 *
 *      On server
 *          Hook into Meteor.onConnection
 *              Execute primary logging method
 *                  Executes secondary methods
 *                  Log connection
 *                  Log uniques
 *
 *      On client
 *          Register global helper
 *          Register Meteor method
 *
 *
 * TODO:
 *      Integrate uniques (and/or counts?)
 *          something like
 *          _.each (h, function (v) {
 *              idmLogDDPUniques.upsert(h.v, {$inc: {count: 1}});
 *          }
 *      Solve nasty meta hack even tho it is trixy
 *      Publish stats
 *      Only console.log if global debug|DEBUG|Debug is set
 *
 *****************************************************************************/

// Collections
idmConnectionLog     = new Meteor.Collection('idm-ddp-connection-log');
idmConnectionUniques = new Meteor.Collection('idm-ddp-connection-log-uniques');

// Pub/Sub
idmConnectionLog.allow({
  insert: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  update: function() {
    return true;
  },
});

idmConnectionUniques.allow({
  insert: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  update: function() {
    return true;
  },
});

idmConnectionLog.deny({
  // All can insert, but only if properly formatted
  insert: function(userId, document) {
    // TODO: Validate
    console.log('iDM Insert Connection Document: ' + JSON.stringify(document, null, 4));
    return false;
  },
  remove: function() {
    return true;
  },
  update: function() {
    return true;
  },
});

idmConnectionUniques.deny({
  // All can insert, but only if properly formatted
  insert: function(userId, document) {
    // TODO: Validate
    console.log('iDM Insert Unique Document: ' + JSON.stringify(document, null, 4));
    return false;
  },
  remove: function() {
    return true;
  },
  update: function() {
    console.log('iDM Update Uniques Document: ' + JSON.stringify(document, null, 4));
    return false;
  },
});

/*******************************************************************************
 *
 * Register DDP connection callback function
 * Use this.stop() if it goes batty
 *
 * ****************************************************************************/

if (Meteor.isServer) {
  Meteor.onConnection(function(o) {

    console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: '
                + 'Logging DDP connection');
    var ip = idmCL.logConnection (o);

  });
}

/*******************************************************************************
 *
 * @iDoMeteor DDP Connection Log Methods
 *
 * ****************************************************************************/

idmCL = {

  /**
   * Get IP of current DDP connection
   */
  getIP: function(connectionObject) {
    // Get header info we can work with
    var h = null;
    h = this.getHeaders(connectionObject);

    // Local vars for logging in order of usage
    var ip         = null;
    var isProxied  = (1 < h.ipTotal) ? true : false;
    var numProxies = h.ipTotal;

    // Determine IP to log
    if (1 == h.ipTotal) {
      ip = h.ipPublic;
    } else if (1 < ipTotal) {
      ip = ipSource;
    }

    return ip;

  },

  /**
   * Return a nicely formatted header object
   */
  getHeaders: function(connectionObject) {

    // Local vars
    var o = connectionObject;
    var h = null;
    var chain = o.httpHeaders['x-forwarded-for'].split(',');
    var languages = o.httpHeaders['accept-language'].split(',');
    var languagePrimary = languages.slice(0, 1);
    var languageSecondary = languages.slice(-1);
    var proxies = null;

    // Strip languages
    languageSecondary = languageSecondary[0].split(';');
    languageSecondary = languageSecondary[0].slice(0, 1);

    // Set proxy count
    if ('undefined' == typeof (process.env.HTTP_FORWARDED_COUNT)) {
      proxies = 1;
    } else if (process.env.HTTP_FORWARDED_COUNT) {
      proxies = parseInt(process.env.HTTP_FORWARDED_COUNT);
    } else {
      proxies = false;
    }

    // Populate header object
    h = {
      browser:            o.httpHeaders['user-agent'],
      host:               o.httpHeaders.host,
      id:                 o.id,
      ipChain:            chain,
      ipPublic:           o.clientAddress,
      ipSource:           chain[0],
      ipTotal:            proxies,
      languagePrimary:    languagePrimary,
      languageSecondary:  languageSecondary,
      languages:          languages,
    }
    return h;

  },

  /**
   * Parse & log DDP connections
   *
   * Should be called via Meteor.onConnection, typically in server/main.js
   */
  logConnection: function(connectionObject) {

    // Locals
    var h                   = this.getHeaders(connectionObject);
    var browser             = h.browser;
    var countBrowser        = null;
    var countUniqueIPs      = null;
    var countUniqueURLs     = null;
    var counter             = null;
    var ip                  = null;
    var ipObject            = null;
    var isProxied           = 1 < h.ipTotal ? true : false;
    var languagePrimary     = null;
    var languageSecondary   = null;
    var numProxies          = h.ipTotal;
    var stamp               = new Date();
    var uniqueBrowser       = null;
    var uniqueExistsURL     = null;
    var uniqueIP            = null;
    var url                 = process.env.ROOT_URL;
    var urlObject           = null;
    var visitor             = null;

    // Determine IP to log
    if (1 == h.ipTotal) {
      ip = h.ipPublic;
      isProxied = false;
    } else if (1 < ipTotal) {
      ip = ipSource;
      isProxied = true;
      numProxies = h.ipTotal;
    }

    // Populate log object
    log = {
      browser: browser,
      ip: ip,
      url: url,
      stamp: stamp,
    }

    // Insert it
    idmConnectionLog.insert(log);

    // Cheat
    if (Meteor.isServer && Inject) {
      Inject.rawHead('opw-connection-ip',
                     '<meta name="ip" content="' + ip + '" />');
    }

    // Return IP to caller
    return ip;

  },

  // End connection logging object
}

// Register client-side method
/*
 * None of this crap works, I tried everything..so I cheated. >:D
 * You are more than welcome to try & fix it for me!
Meteor.methods({

    // Get the connections *real* IP
    getConnectionIP: function () {

        // No need to make others wait
        this.unblock();

        // Locals
        var conn        = this.connection;
        var ipPublic    = conn.clientAddress;
        var ipSource    = conn.httpHeaders['x-forwarded-for'].split(',')[0]
                        || ipPublic;
        var prox        = (process.env.HTTP_FORWARDED_COUNT)
                        ? parseInt(process.env.HTTP_FORWARDED_COUNT)
                        : 0;

        // Determine IP to log
        return (prox) ? ipSource : ipPublic;

    },

});

// Register global helper
if (Meteor.isClient) {
    UI.registerHelper('currentIp', function () {
        return $('meta[name=ip]').attr('content');
    });
    UI.registerHelper('currentUserIp', function () {
        return $('meta[name=ip]').attr('content');
    });
}
*/
