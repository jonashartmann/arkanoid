(function(Crafty, Clay) {
	'use strict';

	Crafty.init(600, 400);
	Crafty.canvas.init();
	Crafty.background('rgb(127,127,127)');

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

	Crafty.scene('splash');

})(Crafty, Clay);
