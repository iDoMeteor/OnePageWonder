/*******************************************************************************
 *
 * #OnePageWonder Browser Policy
 *
 * ****************************************************************************/

var trusted = [
  '*.youtube.com',
  'http://*.meteor.com',
  'https://*.meteor.com',
  'localhost:*',
  'wss://*.meteor.com',
];
var trustedSockets = [
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
