var gulp = require('gulp');
var connect = require('gulp-connect-php');
var browserSync = require('browser-sync');

// Static server
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        server: {
//            baseDir: "./public_html"
//        }
//    });
//    gulp.watch("./public_html/**/*.*", browserSync.reload );
//});

gulp.task('connect-sync', function () {
  connect.server({}, function () {
    browserSync({
      proxy: 'localhost:8000'
    });
  });

  gulp.watch("./public_html/**/*.*").on('change', function () {
    browserSync.reload();
  });
});