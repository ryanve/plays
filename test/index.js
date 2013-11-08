(function(root, server, browser) {
    if (typeof document == 'undefined') server();
    else browser(root);
}(this, function() {
    require('../node_modules/open')(__dirname + '/index.html');
}, function(root) {
    var aok = root.aok
      , log = aok.log
      , plays = root.plays
      , create = Object.create
      , isArray = Array.isArray;

    create && log(create(plays));
    log(plays.audio);
    log(plays.video);
    
    isArray && aok(function() {
        return isArray(plays[this.id = 'audio']);
    }) && aok(function() {
        return isArray(plays[this.id = 'video']);
    });
    
    aok({
        id: 'types'
      , test: '' === plays('audio/-') && typeof plays.audio.mp3 === 'string'
    });
}));