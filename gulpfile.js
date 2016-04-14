var gulp         = require('gulp');
var connect      = require('gulp-connect');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var minifyCss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var clean        = require('gulp-clean');


var cssSrc = ['./assets/css/sanitize.css', './assets/css/main.css'];

// SERVER
gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});


// DEV
gulp.task('html', function () {
  gulp.src('./index.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./assets/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/prod'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/prod'))
    .pipe(connect.reload());
});


// PROD
gulp.task('js-prod', function () {
  gulp.src('./assets/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/prod'));
});

gulp.task('css-prod', function () {
  gulp.src(cssSrc)
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./assets/prod'));
});

gulp.task('clean', function () {
    gulp.src('assets/prod/*.map', {read: false})
      .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['./index.html'], ['html']);
  gulp.watch(cssSrc, ['css']);
  gulp.watch(['./assets/js/*.js'], ['js']);
});



gulp.task('default', ['webserver', 'css', 'js', 'watch']);
gulp.task('prod', ['css-prod', 'js-prod', 'clean']);