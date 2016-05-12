'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var wrap = require("gulp-wrap");
var uglify = require('gulp-uglify');

var SRC_FILES = ['src/**/*.js'];
var COMPILED_SRC_DIR = 'build';

gulp.task('compile', done => {
	gulp.src(SRC_FILES)
	.pipe(concat('permissions.js'))
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(wrap(';(function(window){\n<%= contents %>\n})(self);'))
	.pipe(uglify({compress: {
		negate_iife: false
	}}))
	.pipe(gulp.dest(COMPILED_SRC_DIR))
	.on('finish', done);
});

gulp.task('default', ['compile'])
