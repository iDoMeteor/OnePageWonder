console.log ('#OnePageWonder v1.0.0-RC.2 by @iDoMeteor :: Loading 1 Wonderful Route :>');

Router.route ('/', {

    fastRender: true, // This rocks, thanks @Arunoda!
    layoutTemplate: 'opwLayout',
    loadingTemplate: 'opwLoading',
    name: 'opwRoot',
    subscriptions: function() {
        Meteor.subscribe('opwRows');
    },
    waitOn: function () {
        return [
            Meteor.subscribe('opwHomeRow'),
        ];
    },

});
