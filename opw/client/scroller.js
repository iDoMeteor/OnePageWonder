/******************************************************************************
 *
 * Scrolling indicator events
 *
 * This processes clicks (& taps) on the scroll indicator, when present. Also,
 * handles the OPW brag & social indicators, which should probably be in
 * the layout events.
 *
 *****************************************************************************/

Template.opwScrollIndicator.events({

    /*
     * This is for when I implement a diversified scroll indicator
    'click #opw-scroll-to-first': function (event) {
        OPW.log({message: 'Scrolling to first', type: 'debug'});
        event.preventDefault();
        var state = Session.get('opwScrollState');
        var next  = '#' + state.first;
        OPW.scrollToHref(next);
    },

    'click #opw-scroll-to-last': function (event) {
        console.log({message: 'Scrolling to last', type: 'debug'});
        event.preventDefault();
        var state = Session.get('opwScrollState');
        var next  = '#' + state.last;
        OPW.scrollToHref(next);
    },

    'click #opw-scroll-to-prev': function (event) {
        OPW.log({message: 'Scrolling to prev', type: 'debug'});
        event.preventDefault();
        var state = Session.get('opwScrollState');
        var next  = '#' + state.prev;
        OPW.scrollToHref(next);
    },
    */

    'click #opw-scroll-to-next': function (event) {
        OPW.log({message: 'Scrolling to next', type: 'debug'});
        event.preventDefault();
        var state = Session.get('opwScrollState')
                  || OPW.scrollIndicatorUpdate();
        var next  = '#' + state.next;
        OPW.scrollToHref(next);
    },

    'click #opw-scroll-to-top': function (event) {
        OPW.log({message: 'Scrolling to top', type: 'debug'});
        event.preventDefault();
        var state = Session.get('opwScrollState')
                  || OPW.scrollIndicatorUpdate();
        var first = '#' + state.first
        OPW.scrollToHref(first);
    },

});


/******************************************************************************
 *
 * Scrolling indicator helpers
 *
 *****************************************************************************/

Template.opwScrollIndicator.helpers({

    opwLastDisplayedSectionIsActive: function () {
        state = Session.get('opwScrollState');
        return (OPW.isObject(state)) ? (state.active == state.last) : false;
    },

    opwShowScrollIndicator: function () {
        // Would be 1 < but getRows excludes top row
        return (0 < OPW.getRows().length) ? true : false;
    },

    /*
     * Coming soon
    opwScrollIndicatorStyle: function () {
        return OPW.getNestedConfig('navigation', 'scrollStyle');
    },
    */

});


/******************************************************************************
 *
 * Scrolling indicator rendered function
 *
 * TODO:
 * Since this is theoretically the last to render, it would be a pretty good
 * place to hook up the carousel.  Doing it earlier will either not work (due to
 * data latency (Meteor is delivering the carousel as data not template code)
 * so by time this renders all the sections should also be rendered.
 *
 *****************************************************************************/

// TODO: Should set itself properly if landing on something other than /
// Template.opwScrollIndicator.onRendered(function () {});
