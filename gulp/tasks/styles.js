'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import sass         from 'gulp-sass';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import postcss      from 'gulp-postcss';
import cssnano      from 'cssnano';


gulp.task('styles', function () {

  const createSourcemap = !global.isProd || config.styles.prodSourcemap;
  const processors = [cssnano];

  return gulp.src(config.styles.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(sass({
      // sourceComments: !global.isProd,
      errLogToConsole: true,
      outputStyle: global.isProd ? 'compressed' : 'nested',
      includePaths: config.styles.sassIncludePaths
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulpif(global.isProd, postcss(processors)))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write((global.isProd ? null : '/sourcemaps'),  {sourceRoot: './' }))
    )
    .pipe(gulp.dest(global.isProd ? config.styles.prodDest : config.styles.dest))
    .pipe(browserSync.stream({ once: true }));
});
