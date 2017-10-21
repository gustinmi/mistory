function App() {
    this.root = {};
}

App.prototype = {

	register : function(name, factory){
		this.root[name] = factory(this);
	},

    onStart: function() {
		'use strict';
        var that = this,
        	topMenuItems = $('body .top-container nav.top-bar section > ul > li');
        
        topMenuItems.on('click', function(e){
        	var clickedLi = $(this);
        	e.preventDefault();
        	that.menuClick(clickedLi);
        	return false;
        });
    },

    menuClick: function(clickedLi){

        var liPos = clickedLi.index(),
            text = clickedLi.children('a').text(),
            links = clickedLi.children('ul').children('li:not(".title, .parent-link")').children('a');
        
        if (clickedLi.hasClass('active')) return false; // menu je že izbran

        //debugger;
        this.root.breadcrumbs.add(text, 0);
		
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
    }

};

// bootstrap sequence

(function(){
	var app = new App(); 
	window.app = app;
	window.register = app.register;
	document.addEventListener("DOMContentLoaded", function(event) {
		app.onStart();	
	});
})();