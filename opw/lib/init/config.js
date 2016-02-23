console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Configuration');

/*******************************************************************************
 * OPW Configuration
 *
 * These defaults are used when OPW.getConfig or OPW.getNestedConfig fail to
 * find data in the Singletons database or Meteor.settings file.
 *
 * TODO: Make expires & absolute paths dynamic and remove from settings files.
 *
 * ****************************************************************************/

opw = {

  // CORS Access Control Origin
  // Serialized origin list
  acao: 'localhost:*, https://ddp*.meteor.com',

  // Astronomer keys for local testing
  astronomer: {
    appId: 'ERd8iMfhRqakRdkcD',
  },

  // Bootstrap config
  bootstrap: {

    // May want to move this property out when adding other UIs
    alert: {
      // Defaults, can override when called
      duration: 7000,
      type: 'info',
    },
    carouselInterval: 6000,

  },

  // Contact form config
  contact: {

    btnString: 'Confirm Request!', // TOOD: Allow this to be passed in short tag
    btnStringDetailed: 'Send!',
    detailedFormInvalidSubmission: 'Your submission requires more information, please try again.',
    from: 'OnePageWonder@iDoMeteor.com',
    lightboxLogTitle: 'Contact Log',
    lightboxTitle: 'Direct Communication Form',
    recips: 'OnePageWonder@iDoMeteor.com',
    showDetailed: true,
    showDetailedIcon: 'fa-pencil',
    showDetailedText: 'Write Us',
    thankYouAlert: 'We have received your request and will respond at our earliest opportunity!',
    thankYouText: 'Thank you! We won\'t abuse your trust! :>',

  },

  // Logging configuration
  log: {
    // Whether to send OPW.log() messages to client
    clientSideConsoleLogs: true,
    // Logger has been updated to use this rather than above debug
    debug: true,
    // Debug messages are never logged
    logLogs: true,
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
    account: '',
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
    enable: false,
    sendLogEvents: true,
    trackInPage: false,
    trackInterests: false,
  },

  // Images
  images: {
    auth: '/opw/images/onepagewonder-logo.png',
    logo: '/logo.png',
    navigation: '/opw/images/onepagewonder-logo-24.png',
    stats: '/opw/images/onepagewonder-logo-24-dark.png',
  },

  // Kadira Keys
  kadira: {
    key: '',
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
    allowDynamicTheme: false, // Allow users to change navigation style
    allowDynamicNavigation: false, // Allow users to change navigation style
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

    // Maximum number of unread contact requests allowed per IP address
    //  This allows some degree of flexibility when dupe checking contact
    //  requests, for instance..if at a conference you may wish to raise this
    //  to somewhere over the attendance, but under normal circumstances it
    //  should be relatively low but lowering it to 1 seems to limiting to me
    //  considering it could be two people using wifi @ a coffee shop or something.
    maxContactRequestsPerIp: 10,
    // Do not allow more than X rows
    // Technically, you can add more..but only this many will be
    //  displayed and I think it tosses a non-fatal error
    menuItemMaxCount: 12,
    // Navigation title max length
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
    editorNewSectionLabel: '<i class="fa fa-plus"></i>',
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
    logSectionViews: true,
    notifyAdminOnLoginSuccess: true,
    notifyAdminOnLoginFailure: true,
  },

  wonderBar: {
    helpTitle: '#OnePageWonder WonderBar Help',
  },

}

opwDefaultContent="";
opwDefaultContent += "  <div class=\"col-sm-12\">";
opwDefaultContent += "    <h1>Thanks for trying #OnePageWonder by @iDoMeteor!<\/h1>";
opwDefaultContent += "    <h2>What you need to know to get going:<\/h2>";
opwDefaultContent += "    <h3>The <a href=\"http:\/\/demo.idometeor.com\">demo<\/a> resets every hour a few minutes after the hour begins.<\/h3>";
opwDefaultContent += "  <\/div>";
opwDefaultContent += "";
opwDefaultContent += "  <div class=\"col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-3\">";
opwDefaultContent += "    <dl>";
opwDefaultContent += "      <dt>Admin User<\/dt>";
opwDefaultContent += "      <dd>Only one user may be registered and the username is admin, but you may use any email address.<\/dd>";
opwDefaultContent += "      <dt>Adding Content (refered to as 'rows' or 'sections')<\/dt>";
opwDefaultContent += "      <dd>When logged in, the contact icon changes to a gear.  Click it to launch the editor, then click the + button next to 'Sections'.<\/dd>";
opwDefaultContent += "      <dt>Editing Content<\/dt>";
opwDefaultContent += "      <dd>Click the 'Sections' button in the editor.<\/dd>";
opwDefaultContent += "      <dt>Re-order navigation<\/dt>";
opwDefaultContent += "      <dd>Drag items in the section list using the green handle.<\/dd>";
opwDefaultContent += "      <dt>Remove Content<\/dt>";
opwDefaultContent += "      <dd>Click the trash can in the section list to soft remove rows.  You cannot remove the top row.<\/dd>";
opwDefaultContent += "      <dt>Edit Configuration<\/dt>";
opwDefaultContent += "      <dd>Currently, the configuration editor is not complete. However, rather than digging deep into the code to change the defaults, you can simply copy settings-default.json to settin";
opwDefaultContent += "gs-dev.json and change whatever you want.  You may remove that which you do not change, but you will need to validate your JSON after doing so.<\/dd>";
opwDefaultContent += "      <dt>Single Field Inline Contact Form<\/dt>";
opwDefaultContent += "      <dd>Add any tag with class=\"opw-contact\" to add the contact field";
opwDefaultContent += "      (I recommend span).  If you give it a CSS ID as well, that";
opwDefaultContent += "      will be used as the subject in the contact log.<\/dd>";
opwDefaultContent += "      <dt>Content Tips<\/dt>";
opwDefaultContent += "      <dd>The content you input will be wrapped a section tag with";
opwDefaultContent += "      class 'row' and ID will be the sluggified form of the related";
opwDefaultContent += "      navigation item.<br \/>Therefore, your content should be wrapped";
opwDefaultContent += "      in a div tags with Bootstrap column classes.  There are a few";
opwDefaultContent += "      quick starts in the columns sub-menu of the Wonderbar.<\/dd>";
opwDefaultContent += "      <dt>The #WonderBar<\/dt>";
opwDefaultContent += "      <dd>The #WonderBar is the toolbar above the content area when editing";
opwDefaultContent += "      rows.  Each of the buttons takes you to a sub-menu, except for the envelope";
opwDefaultContent += "      and question mark.  The envelope inserts the inline contact span tag.  The";
opwDefaultContent += "      question mark brings up a help section that I have not yet written.  Within";
opwDefaultContent += "      the sub-menus, you will find buttons that insert code snippets.  Currently,";
opwDefaultContent += "      they append the element code to the bottom of the content in the textarea, so";
opwDefaultContent += "      you will have to copy and paste it where you want it for now.<\/dd>";
opwDefaultContent += "    <\/dl>";
opwDefaultContent += "    <p>The rest is up to you!  I will greatly appreciate any comments, critiques, suggestions or bug reports.<\/p>";
opwDefaultContent += "    <h4 class=\"text-right\">Enjoy, @iDoMeteor<\/h4>";
opwDefaultContent += "  <\/div>";
opwDefaultContent += "  <div class=\"col-sm-5 col-md-4 col-lg-3 \">";
opwDefaultContent += "    <h2>For more information:<\/h2>";
opwDefaultContent += "    <ul>";
opwDefaultContent += "      <li><a href=\"http:\/\/opw.idometeor.com\" title=\"Visit OPW.iDoMeteor.com\">";
opwDefaultContent += "        #OnePageWonder Official Site";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"http:\/\/github.com\/idometeor\/onepagewonder\" title=\"Visit OnePageWonder project page on Github\">";
opwDefaultContent += "        #OnePageWonder on Github";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"https:\/\/www.youtube.com\/playlist?list=PLz5iYsoODTu6kzFGCfB4a1JXw1ZpJXLqg\" title=\"Watch #OnePageWonder videos on YouTube\">";
opwDefaultContent += "        #OnePageWonder on YouTube";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"https:\/\/github.com\/iDoMeteor\/OnePageWonder\/issues\/new\" title=\"#OnePageWonder Bug Reports\">";
opwDefaultContent += "        #OnePageWonder Bug Reports";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"http:\/\/forums.meteor.com\/XXX\" title=\"Discuss #OnePageWonder on Meteor Forums\">";
opwDefaultContent += "        Discuss #OnePageWonder on Meteor Forums";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"http:\/\/twitter.com\/idometeor\" title=\"Visit @iDoMeteor on Twitter\">";
opwDefaultContent += "        @iDoMeteor on Twitter";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"http:\/\/idometeor.com\" title=\"Visit iDoMeteor.com\">";
opwDefaultContent += "        @iDoMeteor Web Site";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"http:\/\/meteorpress.org\" title=\"Visit MeteorPress.org\">";
opwDefaultContent += "        #MeteorPress by @iDoMeteor (Coming Soon)";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "      <li><a href=\"http:\/\/demo.meteorpress.org\" title=\"Try #MeteorPress demo\">";
opwDefaultContent += "        #MeteorPress Demo (not fully functional)";
opwDefaultContent += "      <\/a>";
opwDefaultContent += "      <\/li>";
opwDefaultContent += "    <\/ul>";
opwDefaultContent += "    <span id=\"opw-contact-default\" class=\"opw-contact\"><\/span>";
opwDefaultContent += "  <\/div>";
opwDefaultContent += "";

