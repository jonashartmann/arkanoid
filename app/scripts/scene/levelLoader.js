window.LevelLoader = (function () {
    'use strict';
    var LevelLoader = {};
    LevelLoader.loadLevel = function loadLevel (levelName, cb) {
        // Load level
        $.getJSON('/level/' + levelName + '.json')
        .done(function onLvlLoaded(data) {
            console.log('Level %s successfully loaded.', levelName + '.json');
            cb(null, data);
        })
        .fail(function onLvlLoadFailed (error) {
            console.error('Error loading level %s:', levelName, error);
            cb(error);
        });
    };
    return LevelLoader;
})();
