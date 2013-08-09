(function() {
	'use strict';
	if (!window.Clay) {
		var Clay = window.Clay = {};
		Clay.ready = function LocalDevClayMockupReady (fn) {
			console.warn('Using Clay MOCKUP for development only!');
			window.addEventListener('load', fn);
		};
	}
})();