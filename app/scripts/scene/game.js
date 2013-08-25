(function (LevelLoader) {
    'use strict';

    var _WIDTH = 0;
    var _MAX_LIFES = 5;
    var achievements = {
        START: 'ac_start',
        PAUSE: 'ac_pause',
        LEVEL_1: 'ac_level1',
        LEVEL_2: 'ac_level2',
        LEVEL_3: 'ac_level3',
        LEVEL_5: 'ac_level5',
        LEVEL_7: 'ac_level7',
        BOSS: 'ac_boss',
        PERFECT: 'ac_perfect',
        PERFECT_ALL: 'ac_perfect_perfect',
        COMPLETE_ALL: 'ac_complete_all'
    };
    var levels = [
        'level1',
        'level2',
        'level3',
        'level4',
        'level5',
        'level6',
        'level7',
        'level8',
        'palms',
        'boss'
    ];
    var _totalBricks = 0;
    var _currentLevel = 0;
    var _bricks = [];
    var _points = 0;
    var _pointsOnInitLevel = 0;
    var _lifes = _MAX_LIFES;
    var _lifesOnInitLevel = _MAX_LIFES;
    var ELifes = null;
    var EPoints = null;
    var ELevelName = null;
    var _leaderboard = null;
    var _chain = 0;

    function setupLevel () {
        _WIDTH = Crafty.viewport.width;
        Crafty.bind('SceneChange', _onSceneChange);
        Crafty.bind('KeyUp', function checkForEscape (e) {
            if (e.key === Crafty.keys.ESC) {
                if (Crafty.isPaused()) {
                    Crafty.pause();
                }
                Crafty.scene('menu');
            }
            if (e.key === Crafty.keys.P) {
                Crafty.pause();
                _addAchievement('ac_pause');
            }
        });

        // Load level leaderboard
        _leaderboard = new Clay.Leaderboard( { id: 'lb_arkamasters' } );

        // Load current level
        LevelLoader.loadLevel(levels[_currentLevel], initLevel);
    }

    Crafty.scene('game', setupLevel);

    function _onSceneChange (e) {
        _cleanup(e.newScene !== 'game');
    }

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
            // Only rebounce if the hit was in that direction
            if (info[0].normal.y) {
                ball.dY *= -1;
            }
            if (info[0].normal.x) {
                ball.dX *= -1;
            }

            // destroy the brick
            this.destroy();
            // Add up to the chain
            _chain++;
            // Add points
            _points = _points + (1 * _chain);
            EPoints.text(_points + ' Points');
        };
        for (var i = 0; i < _totalBricks; i++) {
            Crafty.e('Brick, 2D, DOM, Color, Collision, BrickC')
            // .color('#AA0000')
            .attr({ x: _bricks[i].x, y: _bricks[i].y, w: _bricks[i].w, h: _bricks[i].h })
            .onHit('Ball', onHit);
        }
    }

    function createHud (levelName, points, lifes) {
        //HUD info
        ELevelName = Crafty.e('LevelName, DOM, 2D, Text, TextShadow')
            .attr({ x: 20, y: 10, w: 100, h: 20})
            .text(levelName)
            .textFont({ size: '20px', weight: 'bold' });
        EPoints = Crafty.e('Points, DOM, 2D, Text, TextShadow')
            .attr({ x: _WIDTH - 100, y: 10, w: 100, h: 20 })
            .text(points + ' Points')
            .textFont({ size: '20px', weight: 'bold' });
        ELifes = Crafty.e('Lifes, DOM, 2D, Text, TextShadow')
            .attr({ x: _WIDTH - 100, y: 35, w: 100, h: 20})
            .text(lifes + ' Lifes')
            .textFont({ size: '20px', weight: 'bold' });
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
            if (Crafty.isPaused()) {
                return;
            }
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
            // Chain is over!
            _chainEnd(_chain);
            _chain = 0;
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
            window.alert('Oops! Try again.');
            resetGame();
        } else {
            _goToNextLevel();
        }
    }

    function _goToNextLevel () {
        _addEndOfLevelAchievement(_currentLevel);
        _currentLevel++;
        if (_currentLevel >= levels.length) {
            _addHighScore();
            _addAchievement(achievements.COMPLETE_ALL);
            if (_lifes >= _MAX_LIFES) {
                _addAchievement(achievements.PERFECT_ALL);
            }
            Crafty.scene('menu');
            window.alert('Congratulations! You destroyed all levels! How about making your own now?');
            resetGame();
        } else {
            console.log('Resetting level and changing scene');
            resetLevel();
            Crafty.scene('game');
        }
    }

    function _addEndOfLevelAchievement (level) {
        if (level < 3 || level === 4 || level === 6) {
            // Arrays are 0 indexed
            _addAchievement('ac_level' + (level+1));
        }
        if (levels[level] === 'boss') {
            _addAchievement('ac_boss');
        }
        if (level >= 7 && _lifes >= _MAX_LIFES) {
            _addAchievement('ac_perfect');
        }
    }

    function _addAchievement (_id) {
        ( new Clay.Achievement({ id: _id })).award();
    }

    function _addHighScore () {
        _leaderboard.post({score: _points}, function (res) {
            console.log('Posted to Leaderboard', res);
        });
    }

    function _cleanup (closingGame) {
        Crafty.unbind('EnterFrame');
        Crafty.unbind('KeyUp');
        Crafty.unbind('SceneChange', _onSceneChange);
        if (closingGame) {
            _points = _pointsOnInitLevel;
            _lifes = _lifesOnInitLevel;
        } else {
            _pointsOnInitLevel = _points;
            _lifesOnInitLevel = _lifes;
        }
    }

    function _chainEnd (chainSize) {
        if (chainSize >= 3) {
            _addAchievement('ac_chain');
        }
        if (chainSize >= 5) {
            _addAchievement('ac_chain_novice');
        }
        if (chainSize >= 10) {
            _addAchievement('ac_chain_master');
        }
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
        createBricks();
        createHud(lvl.name, _points, _lifes);

        // Verify end of the game on every frame
        Crafty.bind('EnterFrame', function () {
            if (_points >= 2) {
                _addAchievement('ac_start');
            }
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
