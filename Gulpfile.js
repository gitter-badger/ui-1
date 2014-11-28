var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

var paths = {
  'scss': 'src/sass/**/*.scss',
  'css': 'dist/**/*.css'
};

var dest = {
  'css': 'dist/',
};

gulp.task('serve', function(){
  connect.server({
    root: ['/'],
    livereload: true
  });
});

gulp.task('styles', function(){
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(rename('cachet.css'))
    .pipe(gulp.dest(dest.css))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch([paths.scss], ['styles']);
});

gulp.task('default', ['serve', 'watch']);

gulp.task('build', function(){
  return gulp.src(paths.css)
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(rename('cachet.min.css'))
    .pipe(gulp.dest(dest.css));
});