(function() {
	'use strict';

	var BorderRadiusComponent = {
		_radius : 10,
		/** Called as the component is added to an entity */
		init: function init () {
			this.requires('DOM');
			this._apply();
		},
		_apply: function _apply () {
			this.css(
				{
					'border-radius': this._radius,
					'webkit-border-radius': this._radius
				});
		},
		/** Contructor. Used to pass parameter to the component */
		borderRadius: function borderRadius (radius) {
			this._radius = radius;
			this._apply();
			return this;
		}
	};

	Crafty.c('BorderRadius', BorderRadiusComponent);

	var BoxShadow = {
		_color: '#000000',
		init: function init () {
			this.requires('DOM');
			this._apply();
		},
		_apply: function _apply () {
			this.css('box-shadow', '2px 3px 15px 1px ' + this._color);
		},
		shadowColor: function shadowColor (color) {
			this._color = color;
			this._apply();
			return this;
		}
	};

	Crafty.c('BoxShadow', BoxShadow);

	var TextShadow = {
		init: function init () {
			this.requires('DOM');
			this._textShadowColor = '#FFFFFF';
			this._apply();
		},
		_apply: function _apply () {
			this.css('text-shadow', '1px 1px 2px ' + this._textShadowColor);
		},
		textShadowColor: function textShadowColor (color) {
			this._textShadowColor = color;
			this._apply();
			return this;
		}
	};

	Crafty.c('TextShadow', TextShadow);
})();