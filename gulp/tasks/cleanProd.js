'use strict';

import config from '../config';
import gulp   from 'gulp';
import del    from 'del';

gulp.task('cleanProd', function(cb) {

  del([config.prodDir], cb);

});
