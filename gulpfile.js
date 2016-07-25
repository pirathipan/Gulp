var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js',function(){
    return gulp.src(['js/**/*.js','!js/vendor/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js-vendor',function(){
    return gulp.src('js/vendor/**/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist/js/vendor'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('scss',function(){
    return gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('image',function(){
    return gulp.src('img/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('pug',function buildHTML(){
    return gulp.src('pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('default',['js','scss','image'],function(){

});

gulp.task('watch-pug',['pug'],function(){
    browserSync.reload()
});

gulp.task('watch-image',['image'],function(){
    browserSync.reload()
});

gulp.task('watch-js',['js'],function(){
    browserSync.reload()
});

gulp.task('watch-js-vendor',['js-vendor'],function(){
    browserSync.reload()
});



gulp.task('watch',function(){
    gulp.watch('js/vendor/**/*.js',['watch-js-vendor']);
    gulp.watch(['js/**/*.js','!js/vendor/**/*.js'],['watch-js']);
    gulp.watch('scss/**/*.scss',['scss']);
    gulp.watch('img/**/*.{png,jpg,jpeg,gif,svg}',['watch-image']);
    gulp.watch('pug/**/*.pug',['watch-pug']);
});

gulp.task('clean', function(){
    return gulp.src('dist', {read: false})
        .pipe(plumber())
        .pipe(clean());
});

gulp.task('serve',['watch'],function(){
    browserSync.init({
        server:{
            baseDir : 'dist'
        }
    })
});