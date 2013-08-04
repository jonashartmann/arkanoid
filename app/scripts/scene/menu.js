(function() {
    'use strict';
    Crafty.scene('menu', function() {
        console.log("Scene: menu");

        var _WIDTH = 600;
        var _BTN_WIDTH = 256;

        var buttons = {
            START : {
                label: 'Play',
                x: (_WIDTH/2) - (_BTN_WIDTH/2),
                y: 150
            },
            HIGH_SCORE: {
                label: 'Leaderboard',
                x: (_WIDTH/2) - (_BTN_WIDTH/2),
                y: 230
            }
        };


        var gameTitleTextShadow = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 172,
            y : 52
        })
        .text('Arkanoid')
        .textFont({ size: '60px', weight: 'bold' })
        .textColor('#000000');
        var gameTitleText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 170,
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
        var startButton = Crafty.e("2D, DOM, greyBtn, SpriteAnimation, Mouse").attr({
            x : buttons.START.x,
            y : buttons.START.y
        })
        .bind('Click', function() {
            Crafty.scene("game");
        });

        var startText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 265,
            y : buttons.START.y + 10
        })
        .text(buttons.START.label)
        .textFont({ size: '35px', weight: 'bold' })
        .textColor('#007788');

        var scoresBtn = Crafty.e("2D, DOM, greyBtn, SpriteAnimation, Mouse").attr({
            x : buttons.HIGH_SCORE.x,
            y : buttons.HIGH_SCORE.y
        }).bind('Click', function() {
            console.log('Showing Leaderboard');
            // this.removeComponent('greyBtn', false);
            // this.addComponent('greyBtnPressed');
            var btnElem = this;
            var _leaderboard = new Clay.Leaderboard( { id: 'lb_arkamasters' } );
            _leaderboard.show({}, function callback () {
                // btnElem.removeComponent('greyBtnPressed', false);
                // btnElem.addComponent('greyBtn');
            });
        });

        var scoresText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 194,
            y : buttons.HIGH_SCORE.y + 10
        })
        .text(buttons.HIGH_SCORE.label)
        .textFont({ size: '35px', weight: 'bold' })
        .textColor('#007788');
    });
})();
