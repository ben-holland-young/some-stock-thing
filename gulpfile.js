var gulp = require("gulp"),//http://gulpjs.com/
    util = require("gulp-util"),//https://github.com/gulpjs/gulp-util
    sass = require("gulp-sass"),//https://www.npmjs.org/package/gulp-sass
    minifycss = require('gulp-minify-css');//https://www.npmjs.org/package/gulp-minify-css

gulp.task("sass", function(){
    gulp.src("scss/*.scss")
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest("css"))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});
gulp.task("watch", function(){
    gulp.watch("scss/*.scss", ["sass"]);
});
gulp.task('default', function() {
  // place code for your default task here
});
