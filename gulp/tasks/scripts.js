'use strict';

import config     from '../config';
import gulp       from 'gulp';
import gulpif     from 'gulp-if';
import uglify     from 'gulp-uglify';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import notify     from 'gulp-notify';
import babel     from 'gulp-babel';

import browserSync   from 'browser-sync';

// This uses browserSync
gulp.task('scripts', function () {
  var start = Date.now();
  console.log('Building APP bundle');
  return browserify({entries: config.scripts.entryFile, debug: true})
        .transform(babelify)
        .bundle()
        .on('error', function(err) {
          console.log('Error: ' + err.message);
          // end this stream
          // this prevents browserify to crash on compilation error
          this.emit('end');
        })
        .pipe(source(config.scripts.outputFile))
        .pipe(buffer())
        .pipe(gulpif(global.isProd,uglify()))
        .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))
        .pipe(notify(function displayBundleMessage() {
          console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
        }))
        .pipe(browserSync.stream({ once: true }));
});

// Views task
// gulp.task('scripts', function() {
//
//   return gulp.src(config.scripts.src)
//          .pipe(babel({
//              presets: ['es2015']
//          }))
// 		 .pipe(gulpif(global.isProd,uglify()))
//          .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))
//          .pipe(browserSync.stream({ once: true }));
// });
