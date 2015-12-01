/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'),
    connect = require('gulp-connect');
   //  uglify = require('gulp-uglify'),
   //  concat = require('gulp-concat'),
   // // rev = require('gulp-rev-append'),
   //  imagemin = require('gulp-imagemin'),
   //  cssmin = require('gulp-minify-css'),
    //htmlmin = require('gulp-htmlmin');
var path = {
  src   : "src/",
  css   : "src/css/",
  js    : "src/js/",
  scss  : "src/scss/",
  img   : "src/images/",
  build : "build"
}
/*gulp.task('concat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});*/
 
// gulp.task('jsmin', function () {
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('testCssmin', function () {
//     gulp.src('src/css/*.css')
//         .pipe(cssmin())
//         .pipe(gulp.dest('dist/css'));
// });
//gulp.task('testImagemin', function () {
//   gulp.src('src/image/*.{png,jpg,gif,ico}')
//        .pipe(imagemin())
//        .pipe(gulp.dest('dist/image'));
//});

/*gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});*/

// gulp.task('testRev',function(){
//     gulp.src('src/*.html')
//         .pipe(rev())
//         .pipe(gulp.dest('dist/'))
// })

gulp.task('default', [/*'concat',*/ 'jsmin','testCssmin',/*'testHtmlmin',*/'testRev']);
gulp.task('watch', function() {
    gulp.watch(path.src + '**/*.*',['reload-dev']);
});

gulp.task('connectDev', function() {
  connect.server({
    root: path.src,
    port: 8000,
    livereload: true
  });
});

//reload server
gulp.task('reload-dev',function() {
  gulp.src(path.src + '**/*.*')
    .pipe(connect.reload());
});
//测试服务器
gulp.task('default', ['connectDev', 'watch']);