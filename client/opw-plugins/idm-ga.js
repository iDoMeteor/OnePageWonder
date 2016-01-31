console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading iDM:Google-Analytics');
/******************************************************************************
 *
 * @Summary     @iDoMeteor Google Analytics (meteor add idm:google-analytics)
 * @Version     v1.0.0-RC.1
 * @File        client/opw-plugins/idm-ga.js
 *
 * @Description
 *
 * Usage:
 *          idmGA.event(category, action, label, value);
 *          idmGA.pageview(relative_url);
 *
 * TODO:
 *
 * Might have to move this to /lib to get the methods to the client
 *
 *      0f(idmGA.debug || debug || DEBUG) {
 *
 *  I think event names shouldn't include ids and slugs in them, 
 *  it creates too many collection names in Keen IO and I think 
 *  would make analysis hard in general.
 *
*  I propose event name should be "Viewed /applications/:id/settings 
*  Page" and put the route params into the body of the event. 
*                                                               -ryw
*
 *****************************************************************************/

idmGA       = opw.google;
var debug   = opw.debug || false;

/*
idmGA = {
    account: 'UA-XXXXXXXX-XX',
    cookie: {
        // If you want to customize your cookie, 
        // disable auto & set the rest..validity is on you! :)
        auto: true,
        domain: null,
        expires: null,
        name: null,
    },
    debug: true,
    enabled: false,
    trackInPage: true,
    trackInterests: true,
}
var debug = YOUR_DEBUG_SETTING
*/

if(idmGA && idmGA.enabled) {

    /***************************************************************************
     *
     * Google Analytics - analytics.js loader
     *
     * If you would prefer to load via GA rather than locally, remove
     * client/lib/analytics.js and uncomment the load after this comment.
     *
     * If you want to manually upgrade the local client/lib/analytics.js,
     * load up the aforementioned URL in your browser and save it over ^.
     *
     * The load after this comment is essentially Google's script loading code,
     *      load = function(i,s,o,g,r,a,m),
     * de-obfuscated.
     *
     * ************************************************************************/
    // load(window,
    //      document,
    //      'script',
    //      '//www.google-analytics.com/analytics.js',
    //      'ga');

    // Modify
    var cookie   = {};

    // Cookie settings
    if (idmGA.cookie.auto) {
        cookie = 'auto';
    } else {
        cookie.cookieDomain  = idmGA.cookieDomain;
        cookie.cookieExpires = idmGA.cookieExpires;
        cookie.cookieName    = idmGA.cookieName;
    }

    // Call function from analytics.js and connect to GA
    ga('create', idmGA.account, cookie);

    // Track in page events
    if (idmGA.trackInPage) {
        ga('require', 'linkid', 'linkid.js');
    }

    // Track interests
    if (idmGA.trackInterests) {
        ga('require', 'displayfeatures');
    }

    // Define event action
    idmGA.event = function(category, action, label, value) {

        // Debug
        if (idmGA.debug || debug || DEBUG) {
            console.log('DEBUG Logging GA event: ' 
                        + category 
                        + " | " 
                        + action  
                        + " | "  
                        + label  
                        + " | "  
                        + value);
        }

        // Send it
        ga('send', 'event', category, action, label, value);

    }

    // Define pageview action
    idmGA.pageview = function(url) {

        // Debug
        if(idmGA.debug || debug || DEBUG) {
            console.log('DEBUG Logging GA pageview: ' + url)
        }

        // Validate
        if(!OPW.isValidURL(url)) {
            url = window.location.pathname;
        }

        // Send it
        ga('send', 'pageview', url);

    }

}
