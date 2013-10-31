# [plays](../../)

#### HTML5 `<audio>` and `<video>` feature detects

## API ([0.6](../../releases))

### plays(type, elem?)

```js
plays('audio/mp3') // => boolean
plays('mp3', 'audio') // => boolean
["mp3", "wav"].some(plays, 'audio') // => boolean
```

### Properties

#### plays.audio &rArr; array

```js
plays.audio[0] // => the most probable type
plays.audio.length // => number of available types
plays.audio.m4a // => "probably"|"maybe"|false
plays.audio.mp3 // => "probably"|"maybe"|false
plays.audio.wav // => "probably"|"maybe"|false
plays.audio.ogg // => "probably"|"maybe"|false
plays.audio.opus // => "probably"|"maybe"|false
```

#### plays.video &rArr; array

```js
plays.video[0] // => the most probable type
plays.video.length // => number of available types
plays.video.ogg // => "probably"|"maybe"|false
plays.video.mp4 // => "probably"|"maybe"|false
plays.video.webm // => "probably"|"maybe"|false
```

## License: [MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)