const { src, dest, series, parallel } = require('gulp'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    watch = require('gulp-watch'),
    concat = require("gulp-concat"),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    cleanCSS = require('gulp-clean-css'),
    gcmq = require('gulp-group-css-media-queries'),
    svgSprite = require('gulp-svg-sprite'),
    browserify = require('gulp-browserify'),
    changed = require('gulp-changed');


function Style() {
    return src('src/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())
        /* .pipe(cleanCSS({
            compatibility: 'ie8',
            format: 'keep-breaks'
        })) */
        .pipe(concat('style.css'))
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream())
}

function Template() {
    return src('./src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
}


function Scripts() {
    return src('./src/js/*.js')
        .pipe(dest('./dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
}


function svg() {
    return src('./dist/img/**/*.svg') // svg files for sprite
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "sprite.svg"  //sprite file name
                }
            },
        }
        ))
        .pipe(dest('./dist/img/sprite/'));
}

function watchFiles() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    watch("./src/scss/**/*scss", series(Style));
    watch("./src/pug/**/*.pug", series(Template));
    watch("./src/js/*.js", series(Scripts));
}

module.exports = {
    watch: watchFiles,
    Style: Style,
    Template: Template,
    Scripts: Scripts,
    svg: svg
}