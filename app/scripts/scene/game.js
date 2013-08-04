(function() {
	'use strict';
	Crafty.scene('game', function () {
		var _TOTAL_BRICKS = 6;
		var _leaderboard = new Clay.Leaderboard( { id: 'lb_arkamasters' } );

		Crafty.bind('EnterFrame', function () {
			Crafty('Lifes').each(function () {
				if (this.lifes <= 0) {
					_endGame(false);
				}
			});
			Crafty('Points').each(function () {
				if (this.points === 2) {
					( new Clay.Achievement({ id: 'ac_destroyer' })).award();
				}
				if (this.points >= _TOTAL_BRICKS) {
					_endGame(true);
				}
			});
		});

		//Paddles
		Crafty.e('Paddle, 2D, Canvas, Color, Twoway')
			.color('#0000AA')
			.attr({ x: 260, y: 390, w: 80, h: 10 })
			// .multiway(4, { A: 180, D: 0 });
			.twoway(5, 0);

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
		for (var i = 0; i < _TOTAL_BRICKS; i++) {
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

		function _endGame (victory) {
			if (!victory) {
				_addHighScore();
				Crafty.scene('menu');
				window.alert('Game Over!');
			} else {
				( new Clay.Achievement({ id: 'ac_level1' })).award();
				_addHighScore();
				Crafty.scene('menu');
				window.alert('Congratulations! You won!');
			}
		}

		function _addHighScore () {
			Crafty('Points').each(function () {
				_leaderboard.post({score: this.points}, function (res) {
					console.log('Posted to Leaderboard', res);
				});
			});
		}
	});
})();