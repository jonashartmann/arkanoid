(function(Crafty) {
	'use strict';
	Crafty.init(600, 400);
	Crafty.background('rgb(127,127,127)');

	Crafty.bind('EnterFrame', function () {
		Crafty('Lifes').each(function () {
			if (this.lifes <= 0) {
				Crafty.stop(true);
				window.alert('Game Over!');
				// TODO: Reinitialize everything
				Crafty.init(600, 400);
			}
		});
	});

	//Paddles
	Crafty.e('Paddle, 2D, Canvas, Color, Multiway')
		.color('#0000AA')
		.attr({ x: 260, y: 390, w: 80, h: 10 })
		.multiway(4, { A: 180, D: 0 });

	//Ball
	Crafty.e('Ball, 2D, Canvas, Color, Collision')
		.color('#00FF55')
		.attr({ x: 300, y: 200, w: 10, h: 10,
				dX: 0,
				dY: 3.5 })
		.bind('EnterFrame', function () {
			//hit walls
			if (this.x <= 0 || this.x >= 590) {
				this.dX *= -1;
			}

			if (this.y <= 0) {
				this.dY *= -1;
			}

			// Got outside through the bottom
			if (this.y >= 400) {
				this.y = 200;
				this.x = 300;
				this.dX = 0;

				Crafty('Lifes').each(function () {
					this.text(--this.lifes + ' Lifes');
				});
			}

			this.x += this.dX;
			this.y += this.dY;
		})
		.onHit('Paddle', function (info) {
			var hitted = info[0].obj;
			this.dY *= -1;
			this.dX = this.dX + (this.x - (hitted.x + hitted.w/2)) / 10;
		});

	// Bricks
	var onHit = function (info) {
		var ball = info[0].obj;
		ball.dY *= -1;
		// destroy the brick
		this.destroy();
		// Add point
		Crafty('Points').each(function () {
			this.text(++this.points + ' Points');
		});
	};
	for (var i = 0; i < 6; i++) {
		Crafty.e('Brick'+i+', 2D, Canvas, Color, Collision')
		.color('#AA0000')
		.attr({ x: 40 + 80*i + 4*i, y: 100, w: 80, h: 30 })
		.onHit('Ball', onHit);
	}

	//Score boards
	Crafty.e('Points, DOM, 2D, Text')
		.attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
		.text('0 Points');
	Crafty.e('Lifes, DOM, 2D, Text')
		.attr({ x: 20, y: 40, w: 100, h: 20, lifes: 3})
		.text('3 Lifes');
})(Crafty);
