var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    pump = require('pump');

var src  = 'source',
    dest = 'assets';

var production = (process.env.NODE_ENV && process.env.NODE_ENV.indexOf('production') !== -1);

module.exports = {
    env: production,
    src: src,
    dest: dest,
    destPublic: dest + '/public/',
    component: src + '/public/component/',
    // json 等测试数据文件
    data: {
        src: src + '/views/**/data/**/*'
    },
    tpl: {
        src: src + '/views/_template/**/*.tpl'
    },
    html: {
        src: [
            src + '/views/**/*.html',
            '!' + src + '/views/_origin.html',
            '!' + src + '/views/_common/**/*'
        ],
        common: src + '/views/_template/'
    },
    scss: {
        src: src + '/**/*.scss',
        includePaths: [
            src + '/public/styles',
            src + '/public/component'
        ],
        autoprefixer: {
            browsers: ['Android > 2.4']
        }
    },
    scripts: {
        src: [
            src + '/views/**/*.js',
            '!' + src + '/views/**/_*.js'
        ]
    },
    imagemin: {
        src: [
            src + '/**/images/**/*',
            '!' + src + '/public/plugins/**/images/**/*'
        ],
        settings: { optimizationLevel: 3, progressive: true, interlaced: true }
    },
    public: {
        src: [
            src + '/public/scripts/init/jumpPassport.js',
            src + '/public/scripts/_create.js',
            src + '/public/scripts/_config.js',
            src + '/public/scripts/*.js',
            src + '/public/scripts/ui/*.js',
            src + '/public/scripts/init/_init.js',
        ],
        dest: dest + '/public/scripts/'
    },
    font: {
        src: src + '/public/fonts/*'
    },
    plugins: {
        src: src + '/public/plugins/**/*'
    },
    base: {
        src: [
            src + '/public/scripts/base/base.js',
            src + '/public/plugins/iscroll-probe.js',
            src + '/public/plugins/jquery.cookie.js',
            src + '/public/scripts/base/*.js',
            src + '/public/component/utils/utils.js',
            src + '/public/component/lazy/lazy.js',
        ],
        dest: dest + '/public/scripts/'
    },
    library: {
        src: [
            src + '/public/scripts/lib/*.js',
        ],
        dest: dest + '/public/scripts/'
    },
    js: function(src, concat, dest, cb) {
        pump([
            gulp.src(src),
            // plugins.if(production, plugins.jshint()),
            // plugins.if(production, plugins.jshint.reporter('default')),
            plugins.babel({
                presets: ['es2015']
            }),
            plugins.concat(concat),
            plugins.if(production, plugins.uglify()),
            gulp.dest(dest),
            plugins.livereload(),
            plugins.notify({ message: concat + ' 编译成功' })
        ], cb)
    }
};

// 清除缓存
gulp.task('cleanCache', function(done) {
    return plugins.cache.clearAll(done);
});
