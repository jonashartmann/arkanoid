(function() {
    'use strict';
    Crafty.scene('menu', function() {
        console.log("Scene: menu");

        var buttons = {
            START : 0
        };

        var gameTitleText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 180,
            y : 50
        })
        .text('Arkanoid')
        .textFont({ size: '60px', weight: 'bold' })
        .textColor('#007788');

        // TITLE
        Crafty.e("2D, DOM, gameTitleText, Tween").attr({
            x : 50,
            y : 0
        }).tween({
            y : 65
        }, 60).bind("TweenEnd", function() {
            this.unbind("TweenEnd");
            this.tween({
                y : 55
            }, 20);
            this.bind("TweenEnd", function() {
                this.tween({
                    y : 65,
                }, 20);
            });
        });

        // START BUTTON
        var startButton = Crafty.e("2D, DOM, startBtn, SpriteAnimation, Mouse").attr({
            x : 130,
            y : 150
        });

        var startText = Crafty.e("2D, DOM, startText, SpriteAnimation, Mouse").attr({
            x : 130,
            y : 150
        })
        .bind('Click', function() {
            Crafty.scene("game");
        });
    });
})();
