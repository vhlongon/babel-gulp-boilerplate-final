'use strict';

import config        from '../config';
import gulp          from 'gulp';
import fileinclude    from 'gulp-file-include';
import browserSync   from 'browser-sync';

// Views task
gulp.task('views', function() {

  gulp.src(config.components.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }));

  // Put our index.html in the dist folder
  gulp.src(config.views.index)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(global.isProd ? config.prodDir : config.buildDir))
    .pipe(browserSync.stream({ once: true }));

  // Process any other view files from app/views
  return gulp.src(config.views.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(global.isProd ? config.views.prodDest : config.views.dest))
    .pipe(browserSync.stream({ once: true }));

});