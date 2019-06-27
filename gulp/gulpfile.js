// 需要调用的gulp的各种方法
const {
    src,
    dest,
    series,
    watch
} = require('gulp');

// 处理sass文件的方法
const sass = require('gulp-sass'); // 处理scss文件
const rename = require('gulp-rename'); // 重命名 scss
const minifycss = require('gulp-minify-css'); // 压缩css

function mysass() {
    return src('sass/**/*.scss')
        .pipe(sass())
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('dist/css'));
}


// 处理js代码
const uglify = require('gulp-uglify-es').default; // 解析压缩es6代码

function myJs() {
    return src('js/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('dist/js'))
}


// 图片处理
function img() {
    return src(['img/**/*.jpg', 'img/**/*.png'])
        .pipe(dest('dist/img'))
}

// html 处理
const extender = require('gulp-html-extend') // 合并html文件
const minifyHTML = require('gulp-minify-html')

function html() {
    return src('view/**/*.html')
        .pipe(extender({
            annotations: false,
            verbose: false
        }))
        .pipe(minifyHTML())
        .pipe(dest('dist'))
}

// 热更新
const broeserSync = require('browser-sync')

// 热更新方法
function auto() {
    broeserSync.reload()
    watch('dist/**/*.*', series(auto))
}

exports.default = function (cd) {
    // 开启服务端
    broeserSync.init({
        server: {
            baseDir: 'dist',
            index: 'index.html'
        },
        port: 9091
    })

    watch('dist/**/*.*', series(auto))
    watch('sass/**/*.scss', series(mysass))
    watch(['view/**/*.html', 'template/**/*.html'], series(html))
    watch('js/**/*.js', series(myJs))
    watch(['img/**/*.jpg', 'img/**/*.png'], series(img))


    cd()
}