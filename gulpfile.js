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

// cd C:\Installers\php-5.6.10-nts-Win32-VC11-x86
// .\php -S localhost:8000 -t C:\PROJECTS\warberg.net\public_html