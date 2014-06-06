
(function(){

	var cube = document.getElementById('cube'),
		 faces = cube.getElementsByTagName('figure'),
		 face = 1,
		 htmlElement = document.getElementsByTagName("html")[0];

	(function loopCube(){
	    setTimeout(function(){
	        htmlElement.className = 'color' + face;
	        cube.className = 'show-face' + face;
	        face = face < 6 ? ++face : 1;
	        loopCube();
	    }, 2000);
	})();

	var arrow = document.getElementById('arrow');

	// check if arrow is present
	if ( arrow ) {
		arrow.addEventListener('click', function(e){
			// if it's not the first page you visit go back to prev
			// else follow link and go to the homepage
			if ( history.state !== null ){
				window.history.back();
				e.preventDefault();
			}
		}, false);
	}

})();
