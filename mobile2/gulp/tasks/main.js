var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    pump = require('pump'),
    config = require('../config');

// 测试数据文件
gulp.task('data', function() {
    gulp.src(config.data.src, {base: config.src})
        .pipe(gulp.dest(config.dest))
        .pipe(plugins.livereload())
});

// 监听模板
gulp.task('tpl', function() {
    pump([
        gulp.src(config.html.src, {base: config.src}),
        plugins.htmlImport(config.html.common),
        plugins.htmlBeautify(),
        gulp.dest(config.dest),
        plugins.livereload()
    ], function(err) {
        if (!err) return;
        console.warn("\ntpl error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    });
});

// 生成 html 文件
gulp.task('html', function() {
    pump([
        gulp.src(config.html.src, {base: config.src}),
        plugins.changed(config.dest),
        plugins.htmlImport(config.html.common),
        plugins.htmlBeautify(),
        gulp.dest(config.dest),
        plugins.livereload()
    ], function(err) {
        if (!err) return;
        console.warn("\nhtml error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    });
});

// 生成 js 文件
gulp.task('scripts', function() {
    pump([
        gulp.src(config.scripts.src, {base: config.src + '/views'}),
        plugins.changed(config.dest),
        plugins.browserJsInclude(),
        // plugins.if((config.env && '*.js'), plugins.jshint()),
        // plugins.if((config.env && '*.js'), plugins.jshint.reporter('default')),
        plugins.babel({
            presets: ['es2015']
        }),
        plugins.if((config.env && '*.js'), plugins.uglify()),
        gulp.dest(config.destPublic),
    ], function(err) {
        if (!err) return;
        console.warn("\nscripts error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    });
});

// 编译scss文件
gulp.task('scss', function() {
    pump([
        gulp.src(config.scss.src, {base: config.src + '/views'}),
        plugins.changed(config.dest),
        plugins.sass({
            outputStyle: 'expanded',
            includePaths: config.scss.includePaths
        }),
        plugins.autoprefixer(config.scss.autoprefixer),
        plugins.if(config.env, plugins.cleanCss()),
        gulp.dest(config.destPublic),
        plugins.livereload()
        // plugins.notify({message: 'styles 编译成功'})
    ], function(err) {
        if (!err) return;
        console.warn("\nscss error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    })
});

// 输出压缩图片
gulp.task('imagemin', function() {
    return gulp.src(config.imagemin.src, {base: config.src + '/views'})
        // .pipe(plugins.cache(plugins.imagemin(config.imagemin.settings)))
        .pipe(gulp.dest(config.destPublic))
        // .pipe(plugins.notify({ message: 'images 压缩成功' }));
});

// 编译 public.js
gulp.task('public', function() {
    config.js(config.public.src, 'public.js', config.public.dest, function(err) {
        if (!err) return;
        console.warn("\npublic.js error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    });
});

// 合并输出 base.js
gulp.task('base', function() {
    gulp.src(config.base.src)
    config.js(config.base.src, 'base.js', config.base.dest, function(err) {
        if (!err) return;
        console.warn("\nbase.js error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    })
});

// 输出font
gulp.task('font', function() {
    gulp.src(config.font.src, {base: config.src})
        .pipe(gulp.dest(config.dest))
        .pipe(plugins.livereload())
});

// plugins
gulp.task('plugins', function() {
    gulp.src(config.plugins.src, {base: config.src})
        .pipe(gulp.dest(config.dest));
});

// library
gulp.task('library', function() {
    pump([
        gulp.src(config.library.src, {base: config.src}),
        plugins.babel({
            presets: ['es2015']
        }),
        plugins.if(config.env, plugins.uglify()),
        gulp.dest(config.dest),
        plugins.livereload(),
    ], function(err) {
        if (!err) return;
        console.warn("\nlibrary error: \n---------------------------------------------\n",
            "message: ", err.message,
            "\n---------------------------------------------\n");
    })
});
