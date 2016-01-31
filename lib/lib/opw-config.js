console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Configuration');

/* Just going with globals for now because this will all
   be in the database soon.. */

// TODO: Make expires & absolute paths dynamic
// TODO: Move to root

opw = {
    
    // Bootstrap config
    bootstrap: {

        alert: {
            // Defaults, can override when called
            duration: 7000,
            type: 'info',
        },
        carouselInterval: 6000,
    
    },

    // Contact form config
    contact: {

        btnString: 'Confirm Request!',
        from: 'idometeor@gmail.com',
        recips: 'idometeor@gmail.com',
        thankYou1: 'Thank you!',
        thankYou2: 'We won\'t abuse your trust! :)',
        thankYouAlert: 'We have received your request and will respond at our earliest opportunity!',
    },

    debug: true,

    // Footer configuration
    // TODO: Flesh out & finish
    footer: {

        // One of 'fixed', 'none', or 'static'
        fixed: true,
        show: true, // Over-rides intelligence if false

    },
    
    // Google Analytics
    google: {
        account: 'UA-23671882-11',
        cookie: {
            // If you want to customize your cookie, 
            // disable auto & set the rest
            auto: true,
            domain: null,
            expires: null,
            name: null,
        },
        debug: true,
        enabled: false,
        trackInPage: true,
        trackInterests: true,
    },

    // Images
    logoAbs: 'http://opw.idometeor.com/logo.png',
    logoRel: '/logo.png',

    // Kadira Keys
    kadira: {
        key: 'cLJbrzqc6CXF36snk',
        enabled: false,
        secret: '176ab09f-bdc6-4b8e-9844-82b672d0bc2a',
    },

    // Layout
    layout: {
        // bootstrap, none (coming soon - polymer, materialize)
        style: 'bootstrap', 
    },

    // Limits
    limit: {
        
        navTitle: 25,
        publish: 100,

    },

    // Limits
    linter: {
        requireLogin: false,
    },
        
    // Meta Tags
    meta: {

        // Standard HTML tags
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
        },

        'itemprop': {
            description: '#OnePageWonder is a jQuery and Bootstrap mini-CMS built with #MeteorJS for quickly deploying one page scrolling web sites.',
            image: 'http://opw.idometeor.com/opw/images/onepagewonder-logo.png',
            title: '#OnePageWonder by @iDoMeteor',
        },

        link: {
            // Favicon
            favicon: '/favicon.png',
        },

        name: {

            dc: { title: '#OnePageWonder by @iDoMeteor' },

            // Geo-location
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

            viewport: 'width=device-width, maximum-scale=1, initial-scale=1, user-scalable=no',

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

        allowDynamic: true, // Allow users to change navigation style
        collapse: true,     // Navbar collapse?
        collapseOffset: 40, // Distance from top until collapse
        fixed: true,        // If false, will scroll off page
        fluid: true,        // Navbar container style (container or container-fluid)

        // Scroll Indicator
        fixedScrollIndicator: true,
        showScrollIndicator: true,

        // Sort Order (and rows, may affect SM)
        // TODO: One of: ['Alphabetical', 'Chronological', 'SortOrder']
        sort: 'Chronological',

        // Style
        // One of: ['Horizontal', 'MeteorPress', 'Scrolling', 'Stacked']
        style: 'Horizontal',

    },

    // Numerics
    numerics: {

        menuItemMaxLength: 25,

    },

    // Prefix
    prefix: 'opw',

    // Rollbar
    rollbar: {

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
        newUserWelcome: 'Thanks for installing #OnePageWonder by @iDoMeteor!',
        userLogin: 'Git\'er done!',
    },

    // Toggles
    toggles: {
    },

}

// Default Row Content
// TODO: Sex this up into columns n such
// TODO: Try rendering w/Blaze to HTML
opwDefaultContent = '<div class="col-lg-12">\n'
    + '<h1>Thanks for trying #OnePageWonder!</h1>\n'
    + '<h2>The README.md is more up to date :></h2>\n'
    + '<dl>'
    + '<dt>Admin User</dt>'
    + '<dd>Only one user may be registered, and when they are logged in, they can edit everything!.</dd>\n'
    + '<dt>Adding Content (\'rows\')</dt>'
    + '<dd>Press the + button (only shows when logged in) to add new content, just paste in some BS column wrappers (or don\'t) and your content!</dd>\n'
    + '<dt>Saving New Navigation Items</dt>'
    + '<dd>Press control + enter at the same time to save & close this section.</dd>\n'
    + '<dt>Saving New Row Content</dt>'
    + '<dd>Press control + enter at the same time to save & close this section.</dd>\n'
    + '<dt>Editing Rows & Nav Items</dt>'
    + '<dd>Add any tag with id="opw-contact" to add the contact field! (I recommend span)</dd>\n'
    + '<dt>Saving Rows</dt>'
    + '<dd>Add any tag with id="opw-contact" to add the contact field! (I recommend span)</dd>\n'
    + '<dt>Removing Rows</dt>'
    + '<dd>Add any tag with id="opw-contact" to add the contact field! (I recommend span)</dd>\n'
    + '<dt>Content Tips</dt>'
    + '<dd>The content you input into the textareas will be wrapped a Bootstrap container div wrapped in a Bootstrap row div.\n'
    + '<dt>Configuration</dt>'
    + '<dd>The content you input into the textareas will be wrapped a Bootstrap container div wrapped in a Bootstrap row div.\n'
    + '</dl>'
    + '<p>The rest is up to you!  I will greatly appreciate any comments, critiques, suggestions or bug reports.</p>\n'
    + '<h4 class="text-right">Enjoy, @iDoMeteor</h4>\n'
    + '<h2>For more information (they don\'t work yet, lol):</h2>\n'
    + '    <ul>\n'
    + '        <li><a \n'
    + '            href="http://onepagewonder.idometeor.com"\n'
    + '            title="Visit OnePageWonder.iDoMeteor.com">\n'
    + '            #OnePageWonder Official Site\n'
    + '            </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://github.com/idometeor/onepagewonder"\n'
    + '            title="Visit OnePageWonder.project page on Github">\n'
    + '            #OnePageWonder on Github\n'
    + '            </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://youtube.com/idometeor/onepagewonder"\n'
    + '            title="Watch #OnePageWonder videos on YouTube">\n'
    + '            #OnePageWonder on YouTube\n'
    + '            </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://twitter.com/idometeor"\n'
    + '            title="Visit @iDoMeteor on Twitter">\n'
    + '            @iDoMeteor on Twitter\n'
    + '            </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://idometeor.com"\n'
    + '            title="Visit iDoMeteor.com">\n'
    + '            @iDoMeteor Web Site\n'
    + '            </a>\n'
    + '        </li>\n'
    + '        <li><a \n'
    + '            href="http://meteorpress.org"\n'
    + '            title="Visit MeteorPress.org">\n'
    + '            #MeteorPress by @iDoMeteor\n'
    + '            </a>\n'
    + '        </li>\n'
    + '    </ul>\n'
    + '</div>\n';
