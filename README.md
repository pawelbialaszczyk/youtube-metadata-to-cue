[![Build status](https://github.com/pawelbialaszczyk/youtube-metadata-to-cue/actions/workflows/main.yml/badge.svg)](https://github.com/pawelbialaszczyk/youtube-metadata-to-cue)
[![Coverage status](https://coveralls.io/repos/github/pawelbialaszczyk/youtube-metadata-to-cue/badge.svg?branch=master)](https://coveralls.io/github/pawelbialaszczyk/youtube-metadata-to-cue?branch=master)

# youtube-metadata-to-cue

Convert youtube-dl video description metadata to a CUE sheet.

## Running

First, download video description metadata as JSON:
```
youtube-dl --write-info-json --skip-download <URL>
```

Next, pass in the output JSON file path as input:
```
node . <PATH>
```

Alternatively, you can pipe in the JSON directly to the script in one go:
```
youtube-dl --dump-json <URL> | ./index.js
```

This will generate a matching CUE sheet based on YouTube's chapter metadata.
