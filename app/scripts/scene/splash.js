(function() {
    'use strict';
    Crafty.scene('splash', function () {
        var splashScreen = Crafty.e("2D, DOM, Image, Tween, Mouse")
            .attr({ x: 230, y: 130})
            .image('images/crafty_logo.png');

        var loadingText = Crafty.e("2D, DOM, Text")
            .attr({
                x: 200,
                y: 250
            })
            .textFont({ size: '40px', weight: 'bold' })
            .text('Loading');

        var count = 0;
        var loadTimeoutID = 0;
        var showLoading = function showLoading () {
            loadingText.text(loadingText.text() + '.');
            if (++count > 3) {
                loadingText.text('Loading');
                count = 0;
            }
            loadTimeoutID = window.setTimeout(showLoading, 400);
        };
        loadTimeoutID = window.setTimeout(showLoading, 400);

        Clay.ready(function() {
            window.clearTimeout(loadTimeoutID);
            Crafty.scene('menu');
        });
    });
})();