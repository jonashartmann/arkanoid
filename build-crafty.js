var File = require('fs');

var includes = [
		'core',
		'intro',
		'HashMap',
		'2D',
		'collision',
		'DebugLayer',
		'DOM',
		'fps',
		'html',
		'storage',
		'extensions',
		'device',
		'sprite',
		'canvas',
		'controls',
		'animate',
		'animation',
		'drawing',
		'isometric',
		'particles',
		'sound',
		'text',
		'loader',
		'math',
		'time',
		'outro'
	];
var l = includes.length;
console.log('=====================');
console.log('=== Build Started ===');
console.log('=====================');
for (var i = 0; i < l; i++) {
	var base = './src/';
	var filePath = base + includes[i] + '.js';
	console.log('[INFO] Reading file: %s', filePath);
	var buf = File.readFileSync(filePath);
	if (i === 0) {
		File.writeFileSync('crafty.js', buf);
	} else {
		File.appendFileSync('crafty.js', buf);
	}
}
console.log('==================');
console.log('=== Build Over ===');
console.log('==================');
