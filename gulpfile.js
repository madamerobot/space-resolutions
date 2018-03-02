require('dotenv').config()
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const gulpUtil = require('gulp-util')
const fs = require('fs') 
const browserify = require('browserify')    
const uglify = require('gulp-uglify')       
const buffer = require('vinyl-buffer')  
const source = require('vinyl-source-stream')
const watchify = require('watchify')
const nodemon = require('gulp-nodemon')

//Watching files for changes
gulp.task('watchStyles', () => {
    gulp.watch('./public/src/styles/*.scss', () => {
        gulp.start('sass')
    })

    gulp.watch('./public/static/**', () => {
        gulp.dest('./public/dist/')
    })
})

gulp.task('watchJs', () => {
    var b = watchify(browserify('./public/src/js/app.js', watchify.args))
        .transform('babelify', {
            presets: ['es2015'],
            ignore: /\/node_modules\/(?!app\/)/
        })

    b.on('update', rebundle)
    b.on('log', gulpUtil.log.bind(gulpUtil))

    function rebundle() {
        return b.bundle()
            .on('error', gulpUtil.log)
            .pipe(source('app.js'))
            .pipe(gulp.dest('./public/dist/js'))
    }
    return rebundle()
})

gulp.task('watchHtml', () => {
    gulp.watch('./public/src/index.html', () => {
        gulp.start('html')
    })
})

//Compiling scss files into css files
gulp.task('sass', () => {
    return gulp.src('./public/src/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/dist/css'))
})

gulp.task('static', () => {
    return gulp.src('./public/src/static/**')
        .pipe(gulp.dest('./public/dist/static'))
})

gulp.task('html', () => {
    return gulp.src('./public/src/index.html')
        .pipe(gulp.dest('./public/dist'))
})

//Compile ES6 js files into ES2015
gulp.task('browserify', () => {
    var b = browserify('./public/src/js/app.js', {
        debug: true
    }).transform('babelify', {
        presets: ['es2015'],
        ignore: /\/node_modules\/(?!app\/)/
    })

    b.on('log', function (msg) {
        console.log(msg)
    })

    return b.bundle()
        .on('error', gulpUtil.log)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js'))
})

gulp.task('watch', ['watchStyles', 'watchJs', 'watchHtml'])
gulp.task('default', ['watch', 'static', 'sass', 'browserify', 'html'])