console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading head injections');

/******************************************************************************
 *
 * @Summary         Injects a proper <head> structure before anything else
 * @Method          injectHead
 * @Param           n/a
 * @Returns         undefined
 * @Location        Client, Server
 *
 * @Description
 *
 *      The deep magic that injects a proper header stack into the document,
 *      it also does some wizardry to get the fastest loading template ever.
 *
 *      It's super awesome that Meteor is so flexible you can write so many
 *      styles of code and have it all just work together, w00t! :D
 *
 *      This is light.. on error checking, set your config properly :p
 *
 * ***************************************************************************/

// Inject the meta data object
if (Meteor.isServer && !Package.appcache && Inject && OPW.getConfig('meta')) {

    var meta            = OPW.getConfig('meta');
    var metaFunctions   = {
        'charset': function (key, value) {
            Inject.rawHead ('opwIM-' + key, '<meta charset="' + value + '" />');
        },
        'http-equiv': function (key, value) {
            metaFunctions.injectMetas(key, value);
        },
        injectNames: function (key, value, prefix) {
            prefix = prefix || '';
            _.each(value,  function (v, k) {
                Inject.rawHead ('opwIM-' + key + '-'
                                + prefix + k,
                                '<meta name="' + prefix + k + '" '
                                + 'content="' + v + '" />');
            });
        },
        injectMetas: function (key, value, prefix) {
            prefix = prefix || '';
            _.each(value,  function (v, k) {
                Inject.rawHead ('opwIM-' + key + '-' + k,
                                '<meta ' + key + '="' + prefix + k + '" '
                                + 'content="' + v + '" />');
            });
        },
        injectProperties: function (key, value) {
            _.each(value,  function (v, k) {
                _.each(v,  function (y, x) {
                    Inject.rawHead ('opwIM-' + key + '-' + k + '-' + x,
                                    '<meta ' + key + '="' + k + ':' + x + '" '
                                    + 'content="' + y + '" />');
                });
            });
        },
        'itemprop': function (key, value) {
            metaFunctions.injectMetas(key, value);
        },
        'link': function (key, value) {
            Inject.rawHead ('opwIM-' + key,
                            '<link rel="icon" href="'
                            + value.favicon
                            + '" />'
                            + '<link rel="shortcut icon" href="'
                            + value.favicon + '" />');
        },
        'name': function (k, v) {
            var nameFunctions = {
                    dc: function (key, value) {
                        metaFunctions.injectNames(key, value, 'dc.');
                    },
                    geo: function (key, value) {
                        metaFunctions.injectNames(key, value, 'geo.');
                    },
                    icbm: function (key, value) {
                        Inject.rawHead ('opwIM-' + key + '-' + k,
                                        '<meta name="' + key + '" '
                                        + 'content="' + value + '" />');
                    },
                    twitter: function (key, value) {
                        metaFunctions.injectNames(key, value, 'twitter:');
                    },
                    viewport: function (key, value) {
                        Inject.rawHead ('opwIM-' + key + '-' + k,
                                        '<meta name="' + key + '" '
                                        + 'content="' + value + '" />');
                    },
            }
            _.each(v, function (value, key) {
                nameFunctions[key](key, value);
            });
        },
        'property': function (key, value) {
            metaFunctions.injectProperties(key, value);
        },
        'title': function (key, value) {
            Inject.rawHead ('opwIM-' + key, '<title>' + value + '</title>');
        },

    }
    _.each(meta, function (value, key) {
        metaFunctions[key](key, value);
    });
    Inject.rawHead ('opwInjectedLoaderCSS', '<style>body{background:#000}#loader{line-height:50px;text-align:center;top:50%;left:50%;transform:translate(-50%,-50%);font-family:helvetica,arial,sans-serif;text-transform:uppercase;font-weight:900;color:#0ff;letter-spacing:.2em;&::before,&::after { content:"";display:block;width:15px;height:15px;background:#0ff;position:absolute;animation:load .7s infinite alternate ease-in-out}&::before{top:0}&::after{bottom:0}@keyframes load{0%{left:0;height:30px;width:15px}50%{height:8px;width:40px}100%{left:235px;height:30px;width:15px}}</style>');
    Inject.rawHead ('opwInjectedAppName', '<meta name="application-name" content="#OnePageWonder by @iDoMeteor">');
    Inject.rawHead ('opwInjectedAuthor', '<meta name="author" content="@iDoMeteor aka Jason Edward White">');
    Inject.rawHead ('opwInjectOnePageWonder', '<meta name="generator" content="#OnePageWonder by @iDoMeteor">');
    Inject.rawBody ('opwInjectedLoaderBody', '<body><div id="opw-loader"></div></body>');

}
