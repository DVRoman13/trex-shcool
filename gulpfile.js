var gulp = require("gulp");
var scss = require("gulp-sass");
var browserSync = require("browser-sync");

gulp.task('compile', function(){
  return gulp.src("app/scss/**/*.scss")
    .pipe(scss())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task("watch", function(done) {
  browserSync.init({
    server:'app/'
  })

  gulp.watch("app/scss/**/*.scss", gulp.series('compile'));
  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('compile', 'watch'));