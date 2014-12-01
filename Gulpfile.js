var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

var paths = {
    'html': ['public/**/*.html'],
    'scss': {
        'all': ['src/sass/*.scss','src/sass/**/*.scss'],
        'main': 'src/sass/main.scss'
    },
    'css': 'dist/**/*.css'
};

// Required vendor files for use in the static site.
var vendors = ['bower_components/jquery/dist/jquery.min.js'];

// Files paths to be used while serving the static site.
var serve = {
    'css': 'public',
    'js': 'public',
    'vendor': 'public/vendor'
};

// Build destination
var dest = {
    'css': 'dist/',
};

// Serves the contents of the public folder with livereload turned on.
gulp.task('serve', function(){
    connect.server({
        root: ['public'],
        livereload: true
    });
});

gulp.task('html', function(){
    return gulp.src(paths.html)
        .pipe(connect.reload());
});

// Compiles the main.scss file and places it in the root of the public folder
gulp.task('styles', function(){
    return gulp.src(paths.scss.main)
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(rename('cachet.css'))
        .pipe(gulp.dest(serve.css))
        .pipe(connect.reload());
});

// Grabs to specified bower_components files and places them in the vedor folder of the public folder
gulp.task('vendor', function(){
    return gulp.src(vendors)
        .pipe(gulp.dest(serve.vendor))
        .pipe(connect.reload());
});

// Watches specified files for use in livereload
gulp.task('watch', function(){
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.scss.all, ['styles']);
});

// Default task, compiles styles, serves vendor, starts server, and starts watch.
gulp.task('default', ['styles','vendor','serve', 'watch']);


// Build task compiles styles, minimizes the file, renames it, and places it in the dist folder.
gulp.task('build', function(){
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(rename('cachet.min.css'))
        .pipe(gulp.dest(dest.css));
});

gulp.task('build-grid', function(){
    return gulp.src('bower_components/csswizardry-grids/csswizardry-grids.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('cachet.layout.css'))
        .pipe(gulp.dest(dest.css));
});
