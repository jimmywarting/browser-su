'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var SRC_FILES = ['src/**/*.js'];
var COMPILED_SRC_DIR = 'build';

gulp.task('compile', done => {
	gulp.src(SRC_FILES)
	.pipe(concat('permissions.js'))
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest(COMPILED_SRC_DIR))
	.on('finish', done);
});

gulp.task('build', done => {
	sequence('compile', done)
})

gulp.task('default', ['build'])
