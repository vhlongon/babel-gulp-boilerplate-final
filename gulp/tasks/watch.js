'use strict';

import config from '../config';
import gulp   from 'gulp';

gulp.task('watch', ['browserSync'], function() {

  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.styles.src,  ['styles']);
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.media.src,  ['media']);
  gulp.watch(config.fonts.src,   ['fonts']);
  gulp.watch(config.components.src, ['views']);
  gulp.watch(config.views.watch, ['views']);

});
