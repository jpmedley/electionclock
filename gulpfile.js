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
		cacheId: 'redder' + version,
		staticFileGlobs: [rootDir + '/**/*.{html,css,png,jpg,gif}',
		                  rootDir + '/js/*.js'],
		stripPrefix: rootDir,
		navigateFallback: 'message.html',
		runtimeCaching: [
		{
			urlPattern: /https:\/\/www\.reddit\.com\/api\/subreddits_by_topic.json?query=javascript/,
			handler: 'cacheOnly',
			options: {
				cache: {
					name: 'subreddits' + version
				}
			}
		},
		{
			urlPattern: /https:\/\/www\.reddit\.com\/r\/\w{1,255}\.json/,
			handler: 'networkFirst',
			options: {
				cache: {
					name: 'titles' + version
				}
			}
		},
		{
			urlPattern: /https:\/\/www\.reddit\.com\/r\/javascript\/comments\/\w{6}\/[\w]{0,255}\.json/,
			handler: 'cacheFirst',
			options: {
			  	cache: {
			     	name: 'articles' + version
			    }
			  }
		}],
		verbose: true
	}, callback);
});