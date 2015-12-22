'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import browserSync from 'browser-sync';

gulp.task('media', function() {

  return gulp.src(config.media.src)
    .pipe(changed(config.media.dest)) // Ignore unchanged files
    .pipe(gulp.dest(global.isProd ? config.media.prodDest : config.media.dest))
    .pipe(browserSync.stream({ once: true }));

});