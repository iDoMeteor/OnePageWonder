console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Configuration');

/*******************************************************************************
 * OPW Configuration
 *
 * Just going with globals for now because this will all
 * be in the database soon.. at which point the file will
 * be renamed default.js and the values inserted into
 * the database if it is empty
 *
 * TODO: Make expires & absolute paths dynamic
 *
 * Thinking about moving all of this out to Meteor.settings.  Then could add
 * a opw.reset option and you could launch different configs based on different
 * settings files.  In OPW they should just provide defaults and everything else
 * should be read from the DB after first run.. Doing this would also make it
 * easy to strip out small sections of OPW into packages that could be useful
 * to others and/or become optional parts of OPW core and just included in OPW
 * via the packages file when distributed.  This would also have the advantage
 * letting people copy their existing base settings file which probably has
 * existing configurations for the  most standard GA/Astronomer/etc packages!
 * Then (or even if not maybe), we could add options to reset the database or
 * any of the collections and probably set up for real fast theme switching /
 * resetting, etc.  If it loads upon launch, that could have a lot of benefits.
 * ****************************************************************************/

opw = {

    // CORS Access Control Origin
    // Serialized origin list
    acao: 'localhost:*, https://ddp*.meteor.com, *.idometeor.com',
    // acao: 'localhost:*, https://ddp*.meteor.com',

    // Astronomer
    astronomer: {
        appId:                  'vd8pnoqTEkWzt6bnh',
        disableMethodTracking:  false,
        disableRouteTracking:   false,
        disableUserTracking:    false,
        enable:                 true,
    },

    // Bootstrap config
    bootstrap: {

        alert: {
            // Defaults, can override when called
            duration: 7000, // May want to move this out when adding other UIs
            type: 'info',
        },
        carouselInterval: 6000,

    },

    // Contact form config
    contact: {

        btnString: 'Confirm Request!', // TOOD: Allow this to be passed in short tag
        btnStringDetailed: 'Send!',
        detailedFormInvalidSubmission: 'Your submission requires more information, please try again.',
        from: 'idometeor@gmail.com',
        lightboxLogTitle: 'Contact Log',
        lightboxTitle: 'Direct Communication Form',
        recips: 'idometeor@gmail.com',
        showDetailed: true,
        showDetailedIcon: 'fa-pencil',
        showDetailedText: 'Write Us',
        thankYouAlert: 'We have received your request and will respond at our earliest opportunity!',
        thankYouText: 'Thank you! We won\'t abuse your trust! :>',

    },

    // Verbose console messages
    debug: true,

    // TODO: Replace above w/this
    log: {
        clientSideConsoleLogs: true,
        debug: true,
        outputTypes: [
            'critical',
            'danger',
            'error',
            'failure',
            'info',
            'security',
            'warning',
        ], // Only log types listed here will be logged to console
    },

    // Footer configuration
    footer: {

        // One of 'fixed', 'none', or 'static'
        fixed: true,
        // Over-rides intelligence if false
        show: true,
        // Footer container style
        fluid: true,

    },

    // Google Analytics
    google: {
        account: 'UA-23671882-12', // Dev keys for localhost:31308
        cookie: {
            // If you want to customize your cookie,
            // disable auto & set the rest
            auto: true,
            domain: null,
            expires: null,
            name: null,
        },
        debug: true,
        debugTrace: false, // Very verbose
        enable: true,
        sendLogEvents: true,
        trackInPage: true,
        trackInterests: true,
    },

    // Images
    logoAbs: 'http://opw.idometeor.com/logo.png',
    logoRel: '/logo.png',
    logoNavigationAbs: 'http://opw.idometeor.com/opw/images/onepagewonder-logo-24.png',
    logoNavigationRel: '/opw/images/onepagewonder-logo-24.png',

    // Kadira Keys
    kadira: {
        key: 'xxx',
        enable: false,
        secret: 'xxx',
    },

    // Layout
    layout: {
        // Sections container style
        fluid: true,
        // bootstrap, none (coming soon - polymer, materialize)
        style: 'bootstrap',
    },

    // Limits
    limit: {

        // TODO: Deprecated, eliminate

        // Maximum length of a navigation item (section title)
        navTitle: 25,
        // Maximum publication limit, eventually will need a pager
        publish: 100,

    },

    // Whether or not to allow an anonymous user to run the linter(s)
    linter: {
        requireLogin: false,
    },

    // Meta Tags
    meta: {

        'http-equiv': {
            'content-type': 'text/html; charset=utf-8',
            'content-script-type': 'text/javascript',
            'content-lanuage': 'EN',
            // Above should always be first
            author: '@iDoMeteor - Marquette, MI',
            copyright: 'The author retains all copyrights to all code, script or graphics which are directly related to the #OnePageWonder Content Management System.  @iDoMeteor retains all copyrights to any intellectual property, logos, or graphics created exclusively for #OnePageWonder. Copyright 2015',
            description: '#OnePageWonder is a jQuery and Bootstrap mini-CMS built with #MeteorJS for quickly deploying one page scrolling web sites.',
            distribution: 'Global',
            expires: new Date().getTime()+86400000, // One week from now
            keywords: 'meteor, javascript, cms, content management, content management system, open source',
            'last-modified': new Date(), // TODO: This should come from DB stamps really
            'revisit-after': '7 Days',
            robots: 'index,follow',
            'X-UA-Compatible': 'IE=edge',
        },

        charset: 'UTF-8', // Has to come after above

        'itemprop': {
            description: '#OnePageWonder is a jQuery and Bootstrap mini-CMS built with #MeteorJS for quickly deploying one page scrolling web sites.',
            image: 'http://opw.idometeor.com/opw/images/onepagewonder-logo.png',
            title: '#OnePageWonder by @iDoMeteor',
        },

        link: {
            favicon: '/favicon.png',
        },

        name: {

            dc: { title: '#OnePageWonder by @iDoMeteor' },

            geo: {
                placename: 'Marquette',
                position: '46.5;-87.4',
                region: 'US-MI',
            },

            // Would you like to play a game..
            icbm: '46.5, -87.4',

            // Twitter Card tags
            twitter: {
                creator: '@iDoMeteor',
                description: '#OnePageWonder is a jQuery and Bootstrap mini-CMS built with #MeteorJS for quickly deploying one page scrolling web sites.',
                image: 'http://opw.idometeor.com/opw/images/onepagewonder-logo.png',
                site: 'http://opw.idometeor.com',
                title: '#OnePageWonder by @iDoMeteor',
            },

            viewport: 'width=device-width, initial-scale=1',
            // viewport: 'width=device-width, maximum-scale=1, initial-scale=1, user-scalable=no',

        },

        property: {

            // Open Graph tags
            og: {
                description: '#OnePageWonder is a jQuery and Bootstrap mini-CMS built with #MeteorJS for quickly deploying one page scrolling web sites.',
                image: 'http://opw.idometeor.com/opw/images/onepagewonder-logo.png',
                site_name: '#OnePageWonder by @iDoMeteor',
                title: '#OnePageWonder by @iDoMeteor',
                type: 'site',
                url: 'http://opw.idometeor.com',
            },

        },

        title: '#OnePageWonder by @iDoMeteor',

    },

    // Navigation
    navigation: {

        // General
        allowDynamicTheme: true, // Allow users to change navigation style
        allowDynamicNavigation: true, // Allow users to change navigation style
        collapse: true,     // Navbar collapse?
        collapseOffset: 40, // Distance from top until collapse
        contextClass: 'default', // Bootstrap navbar-X class (default or inverted)
        fixed: true,        // If false, will scroll off page
        fluid: true,        // Navbar container style (container or container-fluid)

        // Scroll Indicator
        fixedScrollIndicator: true, // Fixed in footer or output as last child of each section
        scrollStyle: 'single',      // Single (double/quad coming soon)
        showScrollIndicator: true,  // Over-rides intelligence if false and will never show

        // Style
        // One of: ['Horizontal', 'MeteorPress', 'Scrolling', 'Stacked']
        style: 'Horizontal',

    },

    // Numerics
    numerics: {

        menuItemMaxLength: 25,
        // Maximum length of a navigation item (section title)
        navTitle: 25,
        // Maximum publication limit, eventually will need a pager
        publishLimit: 100,

    },

    // Prefix
    prefix: 'opw',

    // Rollbar
    rollbar: {

        clientToken:    '',
        enable:         false,
        sendLogEvents:  false,
        serverToken:    '',

    },

    // Site Title
    title: '#OnePageWonder by @iDoMeteor',

    // Social Config
    social: {
        enable: true,
        github: 'http://github.com/iDoMeteor/onepagewonder',
        twitter: 'http://twitter.com/iDoMeteor',
    },

    // Strings
    strings: {
        adminName: 'Administrator',
        adminUsername: 'admin',
        authenticationButtonCreateAccount: 'Create Admin User',
        authenticationButtonLogin: 'Authenticate',
        authenticationCancelled: 'Authentication cancelled',
        authenticationHeading: 'Authenticate Yourself',
        authenticationLoginFailure: 'Authentication failed.',
        authenticationLighboxTitle: 'Login',
        authenticationLoginSuccess: 'Git\'er done!',
        authenticationLogoutFailure: 'You could not be logged out.',
        authenticationLogoutSuccess: 'Thank you, drive thru.',
        authenticationTagline: 'Present your credentials for inspection.',
        cancelLabel: 'Cancel',
        closeLabel: 'Close',
        editorConfigurationLabel: 'Configuration',
        editorDashboardLabel: 'Dashboard',
        editorLighboxTitle: 'System Editor',
        editorLogsLabel: 'Logs',
        editorSectionsLabel: 'Sections',
        emailLabel: 'Email Address',
        loadingText: 'Loading..',
        passwordLabel: 'Password',
        siteStatsLabel: 'Site Statistics',
        submitLabel: 'Submit',
        userIpLabel: 'Your IP',

        newUserWelcome: 'Thanks for installing #OnePageWonder by @iDoMeteor!',
    },

    // Toggles
    toggles: {
        notifyAdminOnLoginSuccess: true,
        notifyAdminOnLoginFailure: true,
    },

}

// Default Row Content
// Caveat: This should reflect the contents of the opwHelpContent
//         template.. but, Template is not yet defined.
opwDefaultContent = ''
    + '<div class="col-sm-12">\n'
    + '    <h1>Thanks for trying #OnePageWonder by @iDoMeteor!</h1>\n'
    + '    <h2>What you need to know to get going:</h2>\n'
    + '    <h3>It\'s not perfect.. yet.</h3>\n'
    + '</div>\n'
    + '\n'
    + '<div class="col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-3">\n'
    + '    <dl>\n'
    + '        <dt>Admin User</dt>\n'
    + '        <dd>Only one user may be registered and the username is Admin.</dd>\n'
    + '        <dt>Adding Content (reffered to as \'rows\' or \'sections\')</dt>\n'
    + '        <dd>When logged in, press the + button to add new content & type or\n'
    + '            paste in some BS column wrappers containing your content.</dd>\n'
    + '        <dt>Editing Rows & Nav Items</dt>\n'
    + '        <dd>Double click a navigation item while logged in.</dd>\n'
    + '        <dt>Re-order navigation</dt>\n'
    + '        <dd>Drag items while logged in.</dd>\n'
    + '        <dt>Edit Configuration</dt>\n'
    + '        <dd>Click the gear while logged in.</dd>\n'
    + '        <dt>Single Field Contact Form</dt>\n'
    + '        <dd>Add any tag with class="opw-contact" to add the contact field \n'
    + '            (I recommend span).  If you give it a CSS ID as well, that \n'
    + '            will be used to categorize it in the reports.</dd>\n'
    + '        <dt>Removing Rows</dt>\n'
    + '        <dd>All rows are soft-removed from the editor.</dd>\n'
    + '        <dt>Content Tips</dt>\n'
    + '        <dd>The content you input will be wrapped a Bootstrap section with \n'
    + '            class \'row\' and ID will be the sluggified form of the related \n'
    + '            navigation item.</dd>\n'
    + '    </dl>\n'
    + '    <p>The rest is up to you!  I will greatly appreciate any comments, critiques, suggestions or bug reports.</p>\n'
    + '    <h4 class="text-right">Enjoy, @iDoMeteor</h4>\n'
    + '</div>\n'
    + '\n'
    + '<div class="col-sm-5 col-md-4 col-lg-3 ">\n'
    + '    <h2>For more information (they don\'t work yet, lol):</h2>\n'
    + '    <ul>\n'
    + '        <li><a \n'
    + '            href="http://onepagewonder.idometeor.com"\n'
    + '            title="Visit OnePageWonder.iDoMeteor.com">\n'
    + '            #OnePageWonder Official Site\n'
    + '        </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://github.com/idometeor/onepagewonder"\n'
    + '            title="Visit OnePageWonder.project page on Github">\n'
    + '            #OnePageWonder on Github\n'
    + '        </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://youtube.com/idometeor/onepagewonder"\n'
    + '            title="Watch #OnePageWonder videos on YouTube">\n'
    + '            #OnePageWonder on YouTube\n'
    + '        </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://twitter.com/idometeor"\n'
    + '            title="Visit @iDoMeteor on Twitter">\n'
    + '            @iDoMeteor on Twitter\n'
    + '        </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://idometeor.com"\n'
    + '            title="Visit iDoMeteor.com">\n'
    + '            @iDoMeteor Web Site\n'
    + '        </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://meteorpress.org"\n'
    + '            title="Visit MeteorPress.org">\n'
    + '            #MeteorPress by @iDoMeteor\n'
    + '        </a>\n'
    + '        </li>\n'
    + '    </ul>\n'
    + '</div>\n'
    ;
