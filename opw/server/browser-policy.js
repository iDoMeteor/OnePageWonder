console.log('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading Browser Policy');
/*******************************************************************************
 *
 * #OnePageWonder Browser Policy
 * v1.0.0-RC.2
 *
 * May need to move external logger API calls via Meteor.methods for CORS.
 *
 * ****************************************************************************/

var trusted = [
  'http://*.google-analytics.com',
  'https://*.google-analytics.com',
  '*.idometeor.com',
  '*.kadira.io',
  '*.rollbar.com',
  '*.youtube.com',
  'http://*.meteor.com',
  'https://*.meteor.com',
  'localhost:*',
  'stats.g.doubleclick.net', // Stupid GA
  'wss://*.meteor.com',
];
var trustedSockets = [
  '*.idometeor.com',
  '*.meteor.com',
  'localhost:*',
];

_.each(trustedSockets, function(origin) {
    BrowserPolicy.content.allowConnectOrigin(origin);
});
_.each(trusted, function(origin) {
    BrowserPolicy.content.allowOriginForAll(origin);
});

BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowDataUrlForAll();
BrowserPolicy.content.allowSameOriginForAll();

BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.disallowInlineScripts();
