// menu.js

window.app.register('menu', function(app) {

    'use strict';

    var exports = {};

    var config = {
    	selTopMenuItems : 'body .top-container nav.top-bar section > ul > li',
    	selSubmenu : 'section.sub-menu'
    };

    var startMenu = function(){

    	var topMenuItems = $(config.selTopMenuItems);
        
        topMenuItems.on('click', function(e){
        	var clickedLi = $(this);
        	e.preventDefault();
        	topMenuClicked(clickedLi);
        	return false;
        });

    };

    var renderLinks = function(links){

        var subTmp = window.sistory4.templates.subCategory;
        var buff = [];
        links.each(function(idx) {
            if (!$(this).text()) return;

            if (idx === (links.length - 1)) { /* more link */
                buff.push(subTmp.format($(this).text(), "display: block;", idx, 1));
            } else {
                buff.push(subTmp.format($(this).text(), "display: none;", idx, 1));

            }
        });

        return $(buff.join(""));
    };

    var topMenuClicked = function(clickedLi){

		var text = clickedLi.children('a').text(),
            links = clickedLi.children('ul').children('li:not(".title, .parent-link")').children('a'),
            liIdx = clickedLi.index(),
            jqSubMenu = $(config.selSubmenu);
        
        if (clickedLi.hasClass('active')) return false; // menu je že izbran

        app.root.breadcrumbs.add(text, 0);
        app.title(text);
		
        $('.collections').hide();
        $('nav li a').removeClass('active');
        clickedLi.children('a').addClass('active');

        var jqWrapper = renderLinks(links);
        jqWrapper.on('click', function(evt){
        	var subMenu = $(this);
        	evt.preventDefault();
        	evt.stopPropagation();
			subMenuClicked(subMenu, liIdx);
        }); 

        jqSubMenu.empty();
        jqSubMenu.html('<div class="grid-x" class="sub-categories"></div>');
        jqSubMenu.children('div.grid-x').append(jqWrapper);
        jqSubMenu.show();

        // prikaži subkategorije
        $("div.subtitle").text(text);
        $("#sub").show();

    };

    var subMenuClicked = function(jqSubmenu, liIdx){

    	var posOfLi = $('a', jqSubmenu).data('idx');
    	var levelOfLi = $('a', jqSubmenu).data('level');
    	var topMenuItems = $(config.selTopMenuItems);
    	var subName = $('span.title', jqSubmenu).text();

    	console.log("Sub item pos: {0}, level: {1}, name: {2}".format(posOfLi,levelOfLi, subName));
		app.root.breadcrumbs.add(subName, 1);

		var parentLi = topMenuItems.eq(liIdx);
		var subLi = parentLi.children('ul').children('li:not(".title, .parent-link")').eq(posOfLi);
    	var subSub = subLi.children('ul').children('li:not(".title, .parent-link")');

    	debugger;

    	return false;

    };

    exports.start = function(item) {
        return startMenu();
    };

    exports.config = function(key, val) {
        config[key] = val;
    };

    return exports;

});