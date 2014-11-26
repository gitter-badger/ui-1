var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var blade = require('gulp-blade');
var connect = require('gulp-connect');

gulp.task('serve', function(){
  'use strict';

  connect.server({
    root: ['public'],
    livereload: true
  });
});

gulp.task('styles', function(){
  'use strict';

  gulp.src('sass/style.scss')
      .pipe(sass())
      .pipe(autoprefix())
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('components', function(){
  'use strict';

  gulp.src('components/*.blade')
      .pipe(blade())
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('watch', function(){
  'use strict';

  gulp.watch(['sass/**'], ['styles']);
  gulp.watch(['components/**'], ['components']);
});

gulp.task('default', ['serve', 'watch']);
