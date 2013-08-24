(function($) {
    'use strict';
    Crafty.scene('editor', function editorScene () {

        showEditorForm();

        var _width = Crafty.viewport.width;
        var _height = Crafty.viewport.height;

        var bricksCreated = 0;
        var lvl = {
            name: "Dynamic Level",
            bricks: []
        };
        var brickSet = {};

        Crafty.e('Line, 2D, Canvas, Color')
            .color('#AAAAAA')
            .attr({ x:0, y:8*_height/10, w:_width, h:2});
        Crafty.e('Line, 2D, Canvas, Color')
            .color('#000000')
            .attr({ x:0, y:8*_height/10, w:_width, h:1});

        var BrickCreator = Crafty.e('BrickCreator, 2D, Canvas, Color, BrickC, Mouse');

        // Adds brick to level by its ID
        // It will overwrite any info already saved with this ID
        var addBrickToSet = function addBrickToSet (brick) {
            brickSet[brick._brickID] = {
                w: brick.w,
                h: brick.h,
                x: brick.x,
                y: brick.y
            };
            console.log('Added brick', brickSet[brick._brickID]);
        };

        var onBrickDropped = function onBrickDropped (mouseEvent) {
            console.log('brick %d dropped', this._brickID);
            addBrickToSet(this);
        };

        var createBrick = function createBrick () {
            console.log('Cloning');
            bricksCreated++;
            var newBrick = Crafty.e('DynamicBrick'+bricksCreated+', 2D, Canvas, Color, BrickC, Draggable')
                .attr({_brickID: bricksCreated})
                .startDrag()
                .bind('StopDrag', onBrickDropped);
        };

        BrickCreator.bind('MouseUp', createBrick);


        // SAVE BUTTON
        var saveText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 5*_width / 6 + 20 - 8,
            y : 9*_height / 10 + 3
        })
        .text('Save')
        .textFont({ size: '25px', weight: 'bold' })
        .textColor('#FFFFFF');
        var saveButton = Crafty.e("2D, DOM, greyBtn, SpriteAnimation, Mouse").attr({
            x : 5*_width / 6 - 8,
            y : 9*_height / 10 + 3,
            w : 100,
            h : 30
        })
        .bind('Click', function() {
            lvl.name = getLevelName();
            var lvlWithBricks = withBricks(lvl);
            if (lvlWithBricks.bricks.length <= 0) {
                window.alert('Your level is empty, please add at least 1 brick!');
                return false;
            }

            var lvlData = JSON.stringify(lvlWithBricks);
            console.log('Trying to save level to file. ', lvl, lvlData);
            var isFileSaverSupported = false;
            try { isFileSaverSupported = !!new Blob(); } catch(e){}
            if (isFileSaverSupported) {
                var blob = new Blob([lvlData], {type: "text/plain;charset=utf-8"});
                window.saveAs(blob, lvl.name+".json");
            } else {
                console.warn('Blob is not supported.');
                window.prompt("Copy it go! (Ctrl/Cmd + C and Enter)", lvlData);
            }
        })
        .attach(saveText);

        // CANCEL BUTTON
        var cancelText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 4*_width / 6,
            y : 9*_height / 10 + 3
        })
        .text('Cancel')
        .textFont({ size: '25px', weight: 'bold' })
        .textColor('#FFFFFF');
        var cancelButton = Crafty.e("2D, DOM, greyBtn, SpriteAnimation, Mouse").attr({
            x : 4*_width / 6 - 10,
            y : 9*_height / 10 + 3,
            w : 100,
            h : 30
        })
        .bind('Click', function() {
            if (window.confirm('You will lose any unsaved data if you continue, are you sure?')) {
                clearLevelName();
                hideEditorForm();
                Crafty.scene('menu');
            }
        })
        .attach(cancelText);

        function withBricks(lvl) {
            lvl.bricks = [];
            for (var brick in brickSet) {
                if (Object.prototype.hasOwnProperty.call(brickSet, brick)) {
                    lvl.bricks.push(brickSet[brick]);
                }
            }
            return lvl;
        }
    });

    function showEditorForm () {
        var $form = $('form[name="levelNameForm"]');
        if ($form) {
            $form.show();
        }
    }

    function hideEditorForm () {
        var $form = $('form[name="levelNameForm"]');
        if ($form) {
            $form.hide();
        }
    }

    function getLevelName () {
        var $input = $('input[name="levelName"]');
        if ($input) {
            return $input.val() || 'dynamic_' + getRandomInt(1, 10000000);
        }
    }

    function clearLevelName () {
        var $input = $('input[name="levelName"]');
        if ($input) {
            $input.val('');
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})(jQuery);
