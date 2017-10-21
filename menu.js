// menu.js

window.app.register('menu', function(app) {

    'use strict';

    var exports = {},
        breadcrumbs = [];

    var config = {

    	selTopMenuItems : 'body .top-container nav.top-bar section > ul > li'
        
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
            links = clickedLi.children('ul').children('li:not(".title, .parent-link")').children('a');
        
        if (clickedLi.hasClass('active')) return false; // menu je že izbran

        app.root.breadcrumbs.add(text, 0);
        app.title(text);
		
        $('.collections').hide();
        $('nav li a').removeClass('active');
        clickedLi.children('a').addClass('active');

        var subTmp = window.sistory4.templates.subCategory;
        var buff = ['<div class="grid-x" class="sub-categories">'];
        links.each(function(idx) {
            if (!$(this).text()) return;

            if (idx === (links.length - 1)) { /* more link */
                buff.push(subTmp.format($(this).text(), "display: block;"));
            } else {
                buff.push(subTmp.format($(this).text(), "display: none;"));

            }
        });
        buff.push('</div>');

        $('section.sub-menu').empty().html(buff.join("")).show();

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