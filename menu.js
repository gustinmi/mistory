// menu.js

window.app.register('menu', function(app) {

    'use strict';

    var exports = {},
        breadcrumbs = [];

    var config = {

    	selTopMenuItems : 'body .top-container nav.top-bar section > ul > li',
    	selSubmenu : 'section.sub-menu'
        
    };

    var startMenu = function(){

    	var that = this,
        	topMenuItems = $(config.selTopMenuItems);
        
        topMenuItems.on('click', function(e){
        	var clickedLi = $(this);
        	e.preventDefault();
        	topMenuClicked(clickedLi);
        	return false;
        });

    };

    var topMenuClicked = function(clickedLi){

		var liPos = clickedLi.index(),
            text = clickedLi.children('a').text(),
            links = clickedLi.children('ul').children('li:not(".title, .parent-link")').children('a'),
            jqSubMenu = $(config.selSubmenu);
        
        if (clickedLi.hasClass('active')) return false; // menu je že izbran

        app.root.breadcrumbs.add(text, 0);
        app.title(text);
		
        $('.collections').hide();
        $('nav li a').removeClass('active');
        clickedLi.children('a').addClass('active');

        var subTmp = window.sistory4.templates.subCategory;
        var buff = [];
        links.each(function(idx) {
            if (!$(this).text()) return;

            if (idx === (links.length - 1)) { /* more link */
                buff.push(subTmp.format($(this).text(), "display: block;", idx));
            } else {
                buff.push(subTmp.format($(this).text(), "display: none;", idx));

            }
        });
        
        var jqWrapper = $(buff.join(""));
        jqWrapper.on('click', function(){
        	//debugger;
        	console.log("Sub item clicked" + $('a', this).data('ref'));
        	return false;
        }); 

        jqSubMenu.empty();
        jqSubMenu.html('<div class="grid-x" class="sub-categories"></div>');
        jqSubMenu.children('div.grid-x').append(jqWrapper);
        jqSubMenu.show();

        // prikaži subkategorije
        $("div.subtitle").text(text);
        $("#sub").show();

    };

    exports.start = function(item) {
        return startMenu();
    };

    exports.config = function(key, val) {
        config[key] = val;
    };

    return exports;

});