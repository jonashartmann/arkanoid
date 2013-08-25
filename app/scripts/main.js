(function(Crafty, Clay, $, Features) {
	'use strict';

	if (!Features.canvas) {
		var $stage = $('#cr-stage');
		$stage.html('<h1 class="no-support">Impossible to create the game because your browser does not support canvas. See you on another browser, right?! ;)</h1>');
		return false;
	}

	Crafty.init(600, 400, 'cr-stage');
	Crafty.canvas.init();
	Crafty.background('#00a0a0 url(data:image/png;base64,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)');

	// load main sprite sheet
	Crafty.sprite(5, "images/quiz_sprite.png", {
		// menu scene buttons
		startBtn : [ 0, 0, 74, 22 ],
		normalBtn : [ 0, 22, 74, 22 ],
		startText : [ 0, 44, 74, 22 ],
		optionsText : [ 74, 44, 74, 22 ],
		helpText : [ 148, 44, 74, 22 ],
		aboutText : [ 0, 88, 74, 22 ],

		questionMarkHappy : [ 293, 132, 45, 62 ],
		questionMarkSad : [ 248, 132, 45, 62 ],

		// cancel scene
		resumeText : [ 148, 88, 74, 22 ],
		quitText : [ 148, 110, 74, 22 ],

		// titles
		gameTitle : [ 0, 132, 138, 24 ],
		optionsTitle : [ 0, 156, 138, 24 ],
		helpTitle : [ 0, 180, 138, 24 ],
		aboutTitle : [ 0, 204, 138, 24 ],

		// options scene
		blueCircleButton : [ 277, 228, 16, 16 ],
		greenCircleButton : [ 277, 244, 24, 22 ],
		backArrow : [ 277, 266, 24, 22 ],

		// help scene
		questionMarkBig : [ 138, 156, 44, 72 ],
		arrowRight : [ 182, 209, 12, 15 ],
		arrowLeft : [ 206, 209, 12, 15 ],

		// options scene
		numberText : [ 0, 228, 101, 23 ],
		soundText : [ 0, 274, 101, 23 ],
		questionsNumber5 : [ 182, 203, 13, 6 ],
		questionsNumber15 : [ 195, 203, 13, 6 ],
		questionsNumber30 : [ 208, 203, 13, 6 ],
		questionTime10 : [ 221, 203, 13, 6 ],
		questionTime30 : [ 234, 203, 13, 6 ],
		questionTime60 : [ 247, 203, 13, 6 ],
		soundOn : [ 260, 203, 13, 6 ],
		soundOff : [ 273, 203, 13, 6 ],

		// quiz completed
		quizEndText : [ 101, 228, 176, 26 ],
		playAgainText : [ 74, 88, 74, 22 ],

		// game scene
		numberL0 : [ 138, 132, 11, 12 ],
		numberR0 : [ 138, 144, 11, 12 ],
		clock : [ 182, 174, 27, 29 ],
		answerBtn : [ 222, 0, 116, 25 ],
		timeText : [ 182, 156, 29, 9 ],
		pointsText : [ 182, 165, 42, 9 ],
		clockHand : [ 209, 174, 1, 12 ]

	});

	Crafty.sprite(256, 64, 'images/buttons_grey.png', {
		greyBtn : [ 0, 0],
		greyBtnPressed : [ 0, 1]
	});

	Crafty.scene('splash');

})(Crafty, Clay, jQuery, Modernizr);
