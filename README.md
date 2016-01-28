# gulp-ccr-concat

Concatenates streams. A cascading configurable gulp recipe for [gulp-chef](https://github.com/gulp-cookery/gulp-chef).

## Install

``` bash
$ npm install --save-dev gulp-chef gulp-ccr-concat
```

## Recipe

Serial Join (from gulp.js cheatsheet p.2)

## Ingredients

* [streamqueue](https://github.com/nfroidure/StreamQueue)

* [gulp-concat](https://github.com/contra/gulp-concat)

## Type

[Stream Processor](https://github.com/gulp-cookery/gulp-chef#writing-stream-processor)

## API

### config.file

Give concatenated stream a new file name.

### config.spit

Optional. Whether to write out file or not. Useful when piping stream for further processing. Default is true.

## Usage

``` javascript
var gulp = require('gulp');
var chef = require('gulp-chef');

var meals = chef({
    src: 'src/',
    dest: 'dist/',
    concat: {
        src: '**/*.js',
        file: 'bundle.js'
    }
});

gulp.registry(meals);
```
