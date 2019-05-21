var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    config = require('../config');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(config.data.src, function() {
        gulp.start('data');
    })
    gulp.watch(config.imagemin.src, function() {
        gulp.start('imagemin');
    })
    gulp.watch(config.font.src, function() {
        gulp.start('font');
    })
    gulp.watch(config.plugins.src, function() {
        gulp.start('plugins');
    })
    gulp.watch(config.library.src, function() {
        gulp.start('library');
    })
    gulp.watch(config.base.src, function() {
        gulp.start('base');
    })
    gulp.watch(config.public.src, function() {
        gulp.start('public');
    })
    gulp.watch(config.tpl.src, function() {
        gulp.start('tpl');
    })
    gulp.watch(config.html.src, function() {
        gulp.start('html');
    })
    gulp.watch(config.scss.src, function() {
        gulp.start('scss');
    })
    gulp.watch(config.scripts.src, function() {
        gulp.start('scripts');
    })
})
