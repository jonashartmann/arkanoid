(function() {
    'use strict';

    Crafty.c('BrickC', {
        init: function BrickInit () {
            this.requires('Color');
            this.requires('BorderRadius');
            this.requires('BoxShadow');
            // TODO: Fix conflict with Brick entities created for the game
            this.color('#22FFaa');
            this.borderRadius(10);
            this.attr({ x: 50, y: 347, w: 80, h: 30 });
        }
    });

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
        _boxShadowColor: '#000000',
        init: function init () {
            this.requires('DOM');
            this._apply();
        },
        _apply: function _apply () {
            this.css('box-shadow', '2px 3px 15px 1px ' + this._boxShadowColor);
        },
        shadowColor: function shadowColor (color) {
            this._boxShadowColor = color;
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