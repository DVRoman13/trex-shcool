var gulp   = require("gulp"),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync');
	swiper = require('swiper');
	
gulp.task('sass', function(){
	return gulp.src('app/scss/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notife: false

	});
});



gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('app/scss/style.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/*.css', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
