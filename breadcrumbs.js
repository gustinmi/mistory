window.app.register('breadcrumbs', function(app) {

    'use strict';

    var exports = {},
        breadcrumbs = [];

    var config = {
        selContainer: 'section.breadcrumbs-section'
    };

    var addBreadcrumb = function(item, level) {

        var newItem = { level: level, text: item },
            breadcrumbsCopy = [];

        $(breadcrumbs).each(function(idx, elt) {
            if (elt.level < level) {
                breadcrumbsCopy.push(elt);
            } else if (elt.level === level) {
                breadcrumbsCopy.push(newItem);
            }
        });

        if (breadcrumbsCopy.length === 0) {
            breadcrumbs.push(newItem);
        } else {
            breadcrumbs.length = 0;
            breadcrumbs = breadcrumbsCopy;
        }

        renderBreadcrumbs();

    };

    var renderBreadcrumbs = function() {

        var cnt = $(config.selContainer),
            isVisible = cnt.css('display'),
            buff = [];

        $(breadcrumbs).each(function(idx, elt) {
            if (idx === (breadcrumbs.length - 1)) { // last
                buff.push(window.sistory4.templates.breadcrumbsItem.format(elt.text, 'active'));
            } else {
                buff.push(window.sistory4.templates.breadcrumbsItem.format(elt.text));
            }
        });

        if (isVisible === 'block') { // append to existing
            cnt.empty().html(window.sistory4.templates.breadcrumbs.format(buff.join("")));
        } else { // create new

            cnt.empty().html(window.sistory4.templates.breadcrumbs.format(buff.join(""))).show();
        }

    };

    exports.add = function(item) {
        return addBreadcrumb(item);
    };

    exports.config = function(key, val) {
        config[key] = val;
    };

    return exports;

});