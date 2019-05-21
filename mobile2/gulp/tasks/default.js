var gulp = require('gulp');

gulp.task('default', ['clean'], function() {
    gulp.start(
        'data', 'imagemin', 'font', 'plugins', 'library', 'base', 'public', 'tpl', 'html', 'scss', 'scripts', 'watch'
    );
});
