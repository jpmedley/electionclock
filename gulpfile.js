 'use strict';

var gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');
var webserver = require('gulp-webserver');

var rootDir = 'app';
var version = '001';

gulp.task('serve', function(callback) {
	gulp.src(rootDir)
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			port: 8001,
			fallback: 'index.html'
		}))
});

gulp.task('msw', ['make-service-worker'], function(callback){
	//Task alias
})

gulp.task('make-service-worker', function(callback) {

	swPrecache.write(path.join(rootDir, 'serviceworker.js'), {
		cacheId: 'electionclock' + version,
		staticFileGlobs: [rootDir + '/**/*.{html,css,png,jpg,gif}',
		                  rootDir + '/js/*.js'],
		stripPrefix: rootDir,
		verbose: true
	}, callback);
});