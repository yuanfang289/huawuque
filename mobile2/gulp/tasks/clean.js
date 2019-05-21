var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    config = require('../config');

// 清空 assets
gulp.task('clean', function() {
    return gulp.src(config.dest, {read: false})
        .pipe(plugins.clean({force: true}));
});
