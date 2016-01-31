// console.log ('Loading iDoMeteor:Google-Analytics');
/*******************************************************************************
 *
 * @Summary     @iDoMeteor Google Analytics
 * @Version     v1.0.0
 *
 * @Description
 *
 * To configure:
 *
 *          Set Meteor.settings.public.iDoMeteorGA from within your program
 *              (#OnePageWonder does it in /lib/exports.js)
 *          OR
 *          Add an object with those properties to Meteor.settings.iDoMeteorGA
 *              and launch/deploy with --settings yoursettings.json
 *          OR
 *          Edit the object after the MANUAL CONFIGURATION comment block
 *
 * Usage:
 *          idmGA.event(category, action, label, value, data);
 *                     (string, string, string, number, object)
 *          idmGA.pageview(relative_url);
 *                        (string)
 *
 * TODO:
 *          It would be nice to automatically pageview() all routes
 *          and hook event() to events.
 *
 ******************************************************************************/

var settings = (
        Meteor.settings['public'] 
        && Meteor.settings['public'].iDoMeteorGA
    )
    ? Meteor.settings.public.iDoMeteorGA
    : (
            Meteor.settings 
            && Meteor.settings.iDoMeteorGA
        )
        ? Meteor.settings.iDoMeteorGA
        : {
            /*******************************************************************
             *
             * MANUAL CONFIGURATION
             *
             * You only need to edit this file if you do not wish to pass the
             * configuration in via Meteor.settings or Meteor.settings.public.
             *
             * ****************************************************************/
            account: 'UA-XXXXXXXX-XX',
            cookie: {
                // If you want to customize your cookie, 
                // disable auto & set the rest..validity is on you! :)
                auto: true,
                domain: null,
                expires: null,
                name: null,
                none: false, // TODO: Set if running on localhost
            },
            debug: false,
            debugTrace: false,
            enable: false,
            trackInPage: false,
            trackInterests: false,
        };


/*******************************************************************************
 *
 * No need to go any further, my friend :> 
 *
 * ****************************************************************************/


// Google's isogram loader, slightly modified
var googleLoader = function(i,s,o,g,r,a,m) {

    // Note: This only runs if you remove the local analytics.js
    //       or are running in debug mode
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1*new Date();
    a = s.createElement(o)
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a,m);

};

// If any return true, analytics_debug will load & verbose logs will be output
var debug       = settings.debug || false;
var trace       = (debug && settings.debugTrace) ? true : false;

// Other locals
var account     = settings.account;
var cookie      = {};
var enabled     = settings.enable && !/XXX/.test(settings.account);
var gaEvent     = null;
var gaPageview  = null;
var gaObj       = null;
var tip         = settings.trackInPage;
var tit         = settings.trackInterests;

// Set up for debugging mode
if (debug && enabled) {

    console.log('** Google Analytics DEBUG Mode **\n' 
                + 'Using settings: '
                + JSON.stringify(settings, null, 4));
    console.log('Loading analytics_debug.js via Google');

    /***************************************************************************
     *
     * @Summary     Google Analytics Debug Mode
     * @Description Remote analytics_debug.js loader
     *
     * This loads Google's analytics_debug.js directly from them.
     *
     * ************************************************************************/

    if (trace) window.ga_debug = {trace: true};
    googleLoader(window,
         document,
         'script',
         '//www.google-analytics.com/analytics_debug.js',
         'gaDebug');

} else if (!ga && enabled) {

    /***************************************************************************
     *
     * @Summary     Google Analytics Normal Mode
     * @Description Remote analytics.js loader
     *
     * If you would prefer to load via Google directly rather than locally, 
     * remove client/lib/analytics.js and the following will automatically
     * do so for you.
     *
     * If you want to manually upgrade the local client/lib/analytics.js,
     * load up the aforementioned URL in your browser and save it over ^.
     *
     * The load after this comment is essentially Google's script loading code,
     *      load = function(i,s,o,g,r,a,m),
     * de-obfuscated.
     *
     * ************************************************************************/

    googleLoader(window,
         document,
         'script',
         '//www.google-analytics.com/analytics.js',
         'ga');

}

if (enabled) {

    // Determine object to use
    gaObj = (debug) ? gaDebug : ga;

    // Cookie settings
    if (settings.cookie.none) {
        console.log('Localhost mode, setting cookie domain to "none"');
        cookie = {cookieDomain: 'none'};
    } else if (settings.cookie.auto) {
        if (debug) console.log('Using auto cookie');
        cookie = 'auto';
    } else {
        cookie.cookieDomain  = settings.cookieDomain;
        cookie.cookieExpires = settings.cookieExpires;
        cookie.cookieName    = settings.cookieName;
        if (debug) {
            console.log('Using manual cookie settings: '
                        + JSON.stringify(cookie, null, 4));
        }
    }

    // Call function from analytics.js and connect to GA
    if (debug) console.log('Creating tracker');
    gaObj('create', account, cookie);

    // Track in page events
    if (tip) {
        if (debug) console.log('Tracking in page events');
        gaObj('require', 'linkid', 'linkid.js');
    }

    // Track interests
    if (tit) {
        if (debug) console.log('Tracking interests');
        gaObj('require', 'displayfeatures');
    }

}

// Instantiate global GA methods
// Caveat: This does not globalize from inside an if statement
idmGA = {

    // Define event action
    event: function(category, action, label, value, data) {

        // Validate
        category = ('string' == typeof(category)) ? category : 'Generic';
        action   = ('string' == typeof(action)) ? action : 'Unknown';
        label    = ('string' == typeof(label)) ? label : '';
        value    = (/^\d*$/.test(value)) ? value : 1;
        data     = ('object' == typeof(data)) ? data : null

        // Debug
        if (debug) {
            console.log('iDM GA DEBUG Logging GA event: ' 
                        + category 
                        + ' | ' 
                        + action  
                        + ' | '  
                        + label  
                        + ' | '  
                        + value);
                        + ' | '  
                        + JSON.stringify(data, null, 4);
        }

        // Send it
        return gaObj('send', 'event', category, action, data);

    },

    // Define pageview action
    // TODO: This could also take a data object if anyone has a reason
    pageview: function(url) {

        // Debug
        if(debug) {
            console.log('iDM GA DEBUG Logging GA pageview: ' + url)
        }

        if (!url) {
            console.log('iDM GA ERROR Attempting to log invalid URL: ' + url)
            return false;
        }

        // Send it
        return gaObj('send', 'pageview', url);

    },

}

