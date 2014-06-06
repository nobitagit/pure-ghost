 if ( Modernizr.history &&
 		Modernizr.csstransforms &&
 		Modernizr.csstransitions )


   var cube = document.getElementById('cube'),
        faces = cube.getElementsByTagName('figure'),
        face = 1;

var htmlElement = document.getElementsByTagName("html")[0];

(function loopCube(){
    setTimeout(function(){
        htmlElement.className = 'color' + face;
        cube.className = 'show-face' + face;
        face = face < 6 ? ++face : 1;
        loopCube();
    }, 2000);
})();

var stageId = '#stage',
	 stage = $(stage),
	 postBox = '.post-box',
	 main = $('#main'),
	 pageTitle = $('title'),
	 body = $('body');


/*
$(postBox).find('a').on('click', function(e){
	
	var $this = $(this),
		 // the href of the clicked anchor
		 href = $this[0].href,
		 // the post box of the clicked anchor
		 clickedPost = $this.parent(postBox),
		 // its siblings
		 postList = clickedPost.siblings(postBox),
		 // count the siblings so we can animate them
		 len = postList.length,
		 timing = 150;
		 i = 0;	
	e.preventDefault();

	(function slideBoxes(){
		setTimeout(function(){
			postList.eq(i).addClass('goBack');
			i++;
			timing -= 10;

			if(i < len){
				slideBoxes();
			} else {
				slideClicked();
			}
		}, timing);
	})();


	function slideClicked(){
		setTimeout(function(){
			clickedPost.addClass('goBack');
			$('#stage').addClass('faded shifted');
			getPost();
		},timing);
	}

	e.preventDefault();

	function getPost(){
		setTimeout(function(){
		  $.get(href, function(data){
		  		//console.log(href + ' #single-article', data.filter('#single-article') )
		  		var html = $(data),
		  			title = html.find('title').html(),
		  			meat = html.find('#stage').html(),
		  			appendCnt = $('#stage').html(meat);

		  			$('title').html(title);

					var pageData = {
						type : 'post',
						loc : href
					}

		  			// Update browser history with the new page
		  			window.history.pushState(pageData, title, href);
		  			setTimeout(function(){
			  			appendCnt.removeClass('faded shifted');		

		  			}, 10);
		   });
		}, timing * 2);
	}

});
*/

	var linkHref,
		 clickedPost,
		 postList,
		 len,
		 dfdAnim,

		 meat,
		 i;

	var Engine = function(){
		// create an object to store page Datas for window.history
		this.pageData;
		// speed of post navigation anim
		this.slideTiming = 150;
		// Just a helper for easing animations
		this.partialTiming = this.slideTiming;
	};

 	Engine.prototype = {
 		setListeners : function(){
 			var self = this;
 			console.log('msg')

 			if( this.pageData.loc === 'post'){
 				console.log('listeners attached');
	 			$('.single-arrow').on('click', function(){
	 				console.log('clicked');
	 			});
 			} else {
 				// homepage and index pages logic
 				$(postBox).find('a').on('click', function(e){
 					self.getPost( e, $(this) );
 				});
 			}
 		},
 		// Animation from index ---> post
 		getPost : function(e, el){
 			// prevent page refresh
 			e.preventDefault();
 			// create a shared object Helper to store els of the animation
			linkHref = el[0].href,
				 // the post box of the clicked anchor
			clickedPost = el.parent(postBox),
				 // its siblings
			postList = clickedPost.siblings(postBox),
				 // count the siblings so we can animate them
			len = postList.siblings(postBox).length

			// animate the boxes
			this.animateBoxes();

			// fetch the link content
			this.fetchContent(linkHref);

 		},
 		fetchContent : function(linkHref){
 			var self = this;
		  $.get(linkHref, function(data){
		  		console.log( $(data).find('#stage') )
		  		var html = $( data ),
		  			 title = html.find('title').html();

		  		meat = html.find('#stage').html();

		  		pageTitle.html(title);

		  		self.injectContent();

		   });		
 		},
 		injectContent : function(){
 			dfdAnim.done(function(){
	   		$(stageId).html(meat);
	   		main.removeClass('shifted'); 
 			});			
 		},
 		animateBoxes : function(){
 			// set a deferred to alert when animation is finished
 			dfdAnim = $.Deferred();
			this.slideOutBoxes();
 		},
 		slideClicked : function(){
 			var self = this;

			setTimeout(function(){
				clickedPost.addClass('goBack');
				// resolve the deferred for the animation
				dfdAnim.resolve();
			}, self.partialTiming);
			// get back the helper timer to its original val
			self.partialTiming = self.slideTiming;
 		},
 		slideOutBoxes : function(){
 			var self = this,
 				 // iterator
	 			 i = 0;

 			// iterate over siblings of the post clicked and slide them out.
			(function loopme(){
				setTimeout(function(){
					postList.eq(i).addClass('goBack');
					i++;
					// ease the animation so it doesn't look flat & boring
					self.partialTiming -= 20;
					if(i < len){
						loopme();
					} else {
						// iteration finished. Now slide the clicked box.
						self.slideClicked();
					}
				}, self.partialTiming);
			})();

			// prepare the #stage for landing, push post out of view while loading
			main.addClass('shifted');
 		},
		storePageData : function(arguments) {
	 		return {
	 			type: body.hasClass('post-template') ? 'post' : 'index',
	 			loc: window.location.href
	 		}
	 	},
	 	init : function(){
	 		// store the data for history API at load time
	 		this.pageData = this.storePageData();
	 		this.setListeners();
	 	}
	
 	}

 	var engine = new Engine;

 	engine.init();

 	// Engine.prototype.init = function() {
 	// 	// store the data for history API at load time
 	// 	this.storePageData();
 	// };

var pageData =  {
	type: body.hasClass('post-template') ? 'post' : 'index',
	loc: window.location.href
};


// Update browser history with the new page
window.history.pushState(pageData, null, window.location.href);

	window.addEventListener('popstate', function(event) {
		console.log(event.state)
	});

var stage = document.getElementById('stage'),
	 headlines = stage.querySelectorAll('.post-box');

