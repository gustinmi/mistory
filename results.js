window.app.register('results', function(app) {

    'use strict';

    var exports = {},
        jqSubMenu;

    var config = {
        selContainer: 'section.results',
        selSubmenu : 'section.sub-menu'
    };


    var showResults = function() {
        var jqSubMenu = $(config.selSubmenu),
            buff = [];

        $(window.publicationData).each(function(idx, elt){

            buff.push(window.sistory4.templates.resultItem.format(
                elt.img,
                elt.naziv,
                elt.desc,
                elt.tip,
                elt.kategorija,
                elt.media,
                elt.mediaNaziv

            ));

        });

        jqSubMenu.empty().html(window.sistory4.templates.resultBanner);
        jqSubMenu.children('ol').append($(buff.join("").replace(/>\s+</g,'><')));
        
    };

    exports.show = function(item, level) {
        return showResults();
    };

    exports.config = function(key, val) {
        config[key] = val;
    };

    return exports;

});