
const gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    del             = require('del'),
    uglify          = require('gulp-uglify'),
    changed         = require('gulp-changed'),
    path            = require('path');

// Fixed Issue: https://github.com/floatdrop/gulp-watch/issues/1
const paths = {
    jsLibs: [
        'jquery.min.js',
        'angular.min.js',
        'angular-aria.min.js',
        'angular-route.min.js',
        'angular-sanitize.min.js',
        'angular-animate.min.js',
        'angular-messages.min.js',
        'angular-material.min.js',
        'md-data-table.min.js',
        'ocLazyLoad.min.js'
    ],
    scripts: ['app.js', 'common/*.js', 'ui/*.js', 'forms/*.js', 'tables/*.js'],
    sass: ['public/styles/**/*.scss'],
    jsLibsDir: path.resolve('public/scripts/libs'),
    jsScriptsDir: path.resolve('public/scripts'),
    distDir: path.resolve('public/dist')
};


/** Development Server ***/
/** Task `sass` and `js-concat` will run in parallel **/
gulp.task('serve', ['sass', 'js-concat:main', 'js-concat:libs'], function() {
    browserSync.init({
        server: './public',
        notify: false,
        port: 2400,
        ui: {port: 2401},
        open: false
    });

});


// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.jsLibs, {cwd: paths.jsLibsDir}, ['js-concat:libs']);
    gulp.watch(paths.scripts, {cwd: paths.jsScriptsDir}, ['js-concat:main']);
    gulp.watch(paths.sass, ['sass']);
});

/** Compile sass to css & run sass:watch task **/
gulp.task('sass',  function() {
    return gulp.src('./public/styles/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.distDir))
});



/** Concatenate all js library files into one ***/
gulp.task('js-concat:libs', function() {
    // define all js files which needs to be concat
    return gulp.src(paths.jsLibs, {cwd: paths.jsLibsDir})
    .pipe(concat('libs.js', {newLine: ';'}))
    .pipe(gulp.dest(paths.distDir));
});

/** Concatenate all the user js files into one */
gulp.task('js-concat:main', function() {
    return gulp.src(paths.scripts, {cwd: paths.jsScriptsDir})
    .pipe(changed(paths.distDir))
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(gulp.dest(paths.distDir));
});

/** compiling with uglify enabled for production **/
gulp.task('js-concat:prod', function() {
    return gulp.src(paths.scripts, {cwd: paths.jsScriptsDir})
    .pipe(changed(paths.distDir))
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distDir));
});


// Task for production only (run `gulp prod`)
gulp.task('prod', ['sass', 'js-concat:prod', 'js-concat:libs'], function() {
    browserSync.init({
        server: './public',
        notify: false,
        port: 2400,
        ui: {port: 2401},
        open: false
    });

});




/*** The default task **/
gulp.task('default', ['serve', 'watch'], function() {
  // place code for your default task here
});









// .... END
