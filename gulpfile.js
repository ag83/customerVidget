var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    jade = require('gulp-jade'),
    htmlmin = require('gulp-htmlmin'),
    myth = require('gulp-myth'),
    concat  = require('gulp-concat'),
    jshint = require('gulp-jshint'),

    jsLibs = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js'

        ],
    cssLibs = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css'
        ],
    fonts = [
        'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff',
        ];


gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
  return gulp.src('assets/js/app.js')
    .pipe(browserify())
    .on('error', console.log)
    .pipe(gulp.dest('public/scripts/')) 
    .pipe(connect.reload()); 
});

gulp.task('css', function() {
  return gulp.src('assets/css/*.styl')
    .pipe(stylus())
    .on('error', console.log)
    .pipe(myth())
    .pipe(gulp.dest('public/css/')) 
    .pipe(connect.reload()); 
});

 
gulp.task('jade', function() {
  return gulp.src('assets/template/*.jade')
    .pipe(jade({pretty: true}))
    .on('error', console.log)
    .pipe(gulp.dest('public/'))
    .pipe(connect.reload()); 
});

gulp.task('fonts', function() {
    return gulp.src(fonts)
            .pipe(gulp.dest('public/fonts/'));
});

gulp.task('libs.js', function () {
    return gulp.src(jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('public/scripts/'))
});

gulp.task('libs.css', function () {
    return gulp.src(cssLibs)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('public/css/'))
});
 

gulp.task('watch', ['libs.js', 'libs.css', 'fonts', 'css', 'lint', 'js', 'jade'], function() {

  gulp.watch('bower.json', ['libs.js', 'libs.css']);
  gulp.watch('assets/template/*.jade', ['jade']);
  gulp.watch('assets/css/*.styl', ['css']);
  gulp.watch('assets/js/*.js', ['lint', 'js']);

});

gulp.task('server', ['watch'], function() {
  connect.server({
    root: 'public', 
    port: 9000, 
    livereload: true 
  })
});

gulp.task('build', function() {
    gulp.src('assets/css/*.styl')
        .pipe(stylus())
        .pipe(myth()) 
        .pipe(csso()) 
        .pipe(gulp.dest('./build/css/')) 

    gulp.src('assets/template/*.jade')
        .pipe(jade())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build/'))


    gulp.src('assets/js/app.js')
        .pipe(browserify())
        .on('error', console.log)
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));

    gulp.src(fonts)
        .pipe(gulp.dest('./build/fonts'))

    gulp.src(jsLibs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./build/scripts'))

    gulp.src(cssLibs)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('./build/css'))
});
