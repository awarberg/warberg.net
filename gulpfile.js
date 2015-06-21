var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public_html"
        }
    });
    gulp.watch("./public_html/**/*.*", browserSync.reload );
});