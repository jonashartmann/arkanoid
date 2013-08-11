(function() {
	'use strict';
	Crafty.scene('editor', function editorScene () {

		var bricksCreated = 0;

		Crafty.c('Brick', {
			init: function BrickInit () {
				this.color('#22FFaa');
				this.attr({ x: 50, y: 50, w: 80, h: 30 });
			}
		});

		var BrickCreator = Crafty.e('BrickCreator, 2D, Canvas, Color, Brick, Mouse');

		var snapToGrid = function snapToGrid (mouseEvent) {
			console.log('Snap brick %d to grid', this._brickID);
		};

		var createBrick = function createBrick () {
			console.log('Cloning');
			bricksCreated++;
			var newBrick = Crafty.e('DynamicBrick'+bricksCreated+', 2D, Canvas, Color, Brick, Draggable')
				.attr({_brickID: bricksCreated})
				.startDrag()
				.bind('StopDrag', snapToGrid);
		};

		BrickCreator.bind('MouseUp', createBrick);
	});
})();