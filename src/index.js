(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else name ? root[name] = make() : make();
}(this, 'plays', function() {

    var doc = document
      , audio = 'audio'
      , video = 'video'
      , canPlayType = 'canPlayType'
      , no = /^no$/
      , mime = /^(\w*)\/([\w-]*)$/i
      , owns = 'hasOwnProperty'
      , create = 'createElement'
      , audios = plays[audio] = []
      , videos = plays[video] = []
      , format = function(mime, codec) {
            return mime + ';codecs="' + codec + '"';
        };
    
    // developer.mozilla.org/en-US/docs/Media_formats_supported_by_the_audio_and_video_elements
    // github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
    // github.com/Modernizr/Modernizr/blob/master/feature-detects/video.js
    audios['m4a'] = [audio + '/aac;', audio + '/x-m4a;'];
    audios['mp3'] = [audio + '/mpeg;'];
    audios['wav'] = [format(audio + '/wav', 1)];
    audios['opus'] = [format(audio + '/ogg', 'opus')];
    audios['ogg'] = [format(audio + '/ogg', 'vorbis')];
    videos['ogg'] = [format(video + '/ogg', 'theora')];
    videos['mp4'] = [format(video + '/mp4', 'avc1.42E01E')];
    videos['webm'] = [format(video + '/webm', 'vp8,vorbis')];

    /**
     * @param {string} type
     * @param {(Element|string|number)=} e
     * @param {*=} scope
     * @return {string}
     * @example plays("audio/mp3")
     * @example plays("mp4", "video")
     * @example ["mp3", "wav"].some(plays, "audio")
     */    
    function plays(type, e) {
        e = typeof e == 'number' ? this.valueOf() : e || (type.match(mime) || [])[1];
        e = typeof e == 'string' ? doc[create](e) : e;
        return canPlayType in e ? e[canPlayType](type).replace(no, '') : '';
    }

    /**
     * hybrid iterator blends _.some, _.detect, and _.reduce
     * @param {{length:number}} ob
     * @param {Function} fn
     * @param {*=} scope
     */    
    function deduce(ob, fn, scope) {
        for (var r, i = 0, l = ob.length; i < l;) {
            if (r = fn.call(scope, ob[i], i++, ob)) return r;
        }
    }
    
    function each(o, fn) {
        for (var k in o) o[owns](k) && fn(o[k], k);
    }
    
    deduce([audios, videos], function(list, i) {
        each(list, function(types, ext) {
            var can = list[ext] = deduce(types, plays, i ? video : audio) || false;
            can && list['maybe' == can ? 'push' : 'unshift'](ext);
        });
    });
        
    return plays;
}));