'use strict';

import config      from '../config';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import browserSync from 'browser-sync';
import pngquant    from 'imagemin-pngquant';

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(gulpif(global.isProd, imagemin({
                 progressive: true,
                 plugins: [pngquant({quality: '65-80'})]
            }))) // Optimize
    .pipe(gulp.dest(global.isProd ? config.images.prodDest : config.images.dest))
    .pipe(browserSync.stream({ once: true }));
});
