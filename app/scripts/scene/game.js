(function (LevelLoader) {
    'use strict';

    var achievements = {
        COMPLETE_ALL: 'ac_complete_all',
        LEVEL_1: 'ac_level1'
    };
    var levels = [
        'level1',
        'level2',
        'scary',
        'level3',
        'level4',
        'level5',
        'level6',
        'palms',
        'boss'
    ];
    var _totalBricks = 0;
    var _currentLevel = 0;
    var _bricks = [];
    var _points = 0;
    var _lifes = 3;
    var ELifes = null;
    var EPoints = null;
    var ELevelName = null;
    // var _leaderboard = new Clay.Leaderboard( { id: 'lb_arkamasters' } );

    function loadLevel () {
        // Load current level
        LevelLoader.loadLevel(levels[_currentLevel], initLevel);
    }

    Crafty.scene('game', loadLevel);

    function resetGame () {
        _totalBricks = 0;
        _currentLevel = 0;
        _bricks = [];
        _points = 0;
        _lifes = 3;
        ELifes = null;
        EPoints = null;
        ELevelName = null;
    }

    function resetLevel () {
        _totalBricks = 0;
        _bricks = [];
        ELifes = null;
        EPoints = null;
        ELevelName = null;
    }

    function createBricks () {
        var onHit = function (info) {
            var ball = info[0].obj;
            ball.dY *= -1;
            // destroy the brick
            this.destroy();
            // Add point
            EPoints.text(++_points + ' Points');
        };
        for (var i = 0; i < _totalBricks; i++) {
            Crafty.e('Brick, 2D, Canvas, Color, Collision')
            .color('#AA0000')
            .attr({ x: _bricks[i].x, y: _bricks[i].y, w: _bricks[i].w, h: _bricks[i].h })
            .onHit('Ball', onHit);
        }
    }

    function createHud (levelName, points, lifes) {
        //HUD info
        ELevelName = Crafty.e('LevelName, DOM, 2D, Text')
            .attr({ x: 20, y: 1, w: 100, h: 20})
            .text(levelName);
        EPoints = Crafty.e('Points, DOM, 2D, Text')
            .attr({ x: 20, y: 20, w: 100, h: 20 })
            .text(points + ' Points');
        ELifes = Crafty.e('Lifes, DOM, 2D, Text')
            .attr({ x: 20, y: 40, w: 100, h: 20})
            .text(lifes + ' Lifes');
    }

    function createBall () {
        Crafty.e('Ball, 2D, Canvas, Color, Collision')
        .color('#00FF55')
        .attr({ x: 300, y: 378, w: 10, h: 10,
                dX: 0,
                dY: 3.5,
                moving: false })
        .bind('KeyUp', function onKeyUp (e) {
            if (e.key === Crafty.keys.SPACE) {
                this.moving = true;
            }
        })
        .bind('EnterFrame', function () {
            if (!this.moving) {
                // Follow the paddle
                this.x = Crafty('Paddle').x + Crafty('Paddle').w/2 - this.w/2;
                this.y = Crafty('Paddle').y - Crafty('Paddle').h;
                return;
            }

            //hit walls
            if (this.x <= 0 || this.x >= 590) {
                this.dX *= -1;
            }

            if (this.y <= 0) {
                this.dY *= -1;
            }

            // Got outside through the bottom
            if (this.y >= 400) {
                this.x = Crafty('Paddle').x + Crafty('Paddle').w/2 - this.w/2;
                this.y = Crafty('Paddle').y - Crafty('Paddle').h;
                this.dX = 0;
                this.moving = false;

                ELifes.text(--_lifes + ' Lifes');
            }

            this.x += this.dX;
            this.y += this.dY;
        })
        .onHit('Paddle', function (info) {
            var hitted = info[0].obj;
            this.dY *= -1;
            this.dX = this.dX + (this.x - (hitted.x + hitted.w/2 - this.w/2)) / 10;
        });
    }

    function createPaddle () {
        Crafty.e('Paddle, 2D, Canvas, Color, Twoway')
        .color('#0000AA')
        .attr({ x: 260, y: 390, w: 80, h: 10 })
        // .multiway(4, { A: 180, D: 0 });
        .twoway(5, 0)
        .bind('Moved', function (oldPos) {
            // Do not allow it to leave the stage
            if (this.x <= 0 || this.x >= Crafty.viewport.width - this.w) {
                this.x = oldPos.x;
            }
        });
    }

    function _endGame (victory) {
        console.log('End of Level!');
        _cleanup();
        if (!victory) {
            _addHighScore();
            Crafty.scene('menu');
            window.alert('Game Over!');
            resetGame();
        } else {
            _addHighScore();
            _goToNextLevel();
        }
    }

    function _goToNextLevel () {
        _addEndOfLevelAchievement(_currentLevel);
        _currentLevel++;
        if (_currentLevel >= levels.length) {
            _addAchievement(achievements.COMPLETE_ALL);
            Crafty.scene('menu');
            window.alert('Congratulations! You destroyed all levels!');
            resetGame();
        } else {
            console.log('Resetting level and changing scene');
            resetLevel();
            Crafty.scene('game');
        }
    }

    function _addEndOfLevelAchievement (level) {
        // Arrays are 0 indexed
        _addAchievement('ac_level' + (level+1));
    }

    function _addAchievement (_id) {
        // ( new Clay.Achievement({ id: _id })).award();
    }

    function _addHighScore () {
        // _leaderboard.post({score: EPoints.points}, function (res) {
        //     console.log('Posted to Leaderboard', res);
        // });
    }

    function _cleanup () {
        Crafty.unbind('EnterFrame');
    }

    function initLevel (err, lvl) {
        if (err) {
            console.error('Error initializing game!', err);
            return false;
        }

        _bricks = lvl.bricks;
        _totalBricks = _bricks.length;

        createPaddle();
        createBall();
        createHud(lvl.name, _points, _lifes);
        createBricks();

        // Verify end of the game on every frame
        Crafty.bind('EnterFrame', function () {
            // if (_points === 2) {
            //  ( new Clay.Achievement({ id: 'ac_destroyer' })).award();
            // }
            if (_lifes <= 0) {
                _endGame(false);
                return true;
            }
            if (Crafty('Brick').length <= 0) {
                _endGame(true);
                return true;
            }
        });

    }
})(window.LevelLoader);
