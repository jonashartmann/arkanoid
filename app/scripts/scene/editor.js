(function() {
    'use strict';
    Crafty.scene('editor', function editorScene () {

        var bricksCreated = 0;
        var lvl = {
            name: "Dynamic Level",
            bricks: []
        };
        var brickSet = {};

        Crafty.c('Brick', {
            init: function BrickInit () {
                this.color('#22FFaa');
                this.attr({ x: 50, y: 347, w: 80, h: 30 });
            }
        });

        var BrickCreator = Crafty.e('BrickCreator, 2D, Canvas, Color, Brick, Mouse');

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
            var newBrick = Crafty.e('DynamicBrick'+bricksCreated+', 2D, Canvas, Color, Brick, Draggable')
                .attr({_brickID: bricksCreated})
                .startDrag()
                .bind('StopDrag', onBrickDropped);
        };

        BrickCreator.bind('MouseUp', createBrick);


        // SAVE BUTTON
        var saveText = Crafty.e("2D, DOM, Text, Mouse").attr({
            x : 435,
            y : 337 + 10
        })
        .text('Save')
        .textFont({ size: '35px', weight: 'bold' })
        .textColor('#007788');
        var editorButton = Crafty.e("2D, DOM, greyBtn, SpriteAnimation, Mouse").attr({
            x : 345,
            y : 337
        })
        .bind('Click', function() {
            var lvlData = JSON.stringify(withBricks(lvl));
            console.log(lvl, lvlData);
            window.prompt("Copy it", lvlData);
        })
        .attach(saveText);

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
})();