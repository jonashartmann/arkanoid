( function(root) {
	'use strict';
	var Clay = root.Clay || {};
	Clay.gameKey = 'arkanoid';
	Clay.readyFunctions = [];
	Clay.ready = function( fn ) {
		Clay.readyFunctions.push( fn );
	};
	root.Clay = Clay;

    var clay = document.createElement('script');
    clay.async = true;
    clay.src = ( 'https:' === document.location.protocol ? 'https://' : 'http://' ) + 'clay.io/api/api.js';
    var tag = document.getElementsByTagName('script')[0];
    tag.parentNode.insertBefore(clay, tag);
} )(window);