function App(title) {
	this.titleTxt = title;
    this.root = {};
}

App.prototype = {

	register : function(name, factory){
		this.root[name] = factory(this);
	},

    onStart: function() {
		'use strict';
		this.root.menu.start();
		this.title();

		$('#logoImg').on('click', function(){
			window.location.href = "index.html";
		});


		$('.top-container').on('click', function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});


    },

    title : function(title){
    		
    	if (title){
			$('title').text(this.titleTxt + " - " + title);
    	}else{
    		$('title').text(this.titleTxt);
    	}

    },

    hashchange(hash){
    	console.log("Hash changed" + hash);
    	// todo : support bookmarkable urls
    }

};

// bootstrap sequence

(function(){
	var app = new App("sistory 4"); 
	window.app = app;
	window.register = app.register;
	document.addEventListener("DOMContentLoaded", function() {
		app.onStart();	
	});
	window.addEventListener("hashchange",function(){
		app.hashchange(document.location.hash);
	});
})();