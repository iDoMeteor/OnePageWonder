console.log ('#OnePageWonder v1.0.0-beta.1 Loading Routes');
Router.configure ({
    layoutTemplate: 'opwLayout',
    loadingTemplate: 'opwLoading',
    waitOn: function () {
        return [
            Meteor.subscribe('opwRows'),
        ];
    },
    fastRender: true,
});
Router.route ('/', {
    name: 'opwRoot',
    onRun: function () {
        GAnalytics.pageview('/');
        this.next();
    },

});
