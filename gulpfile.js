var gulp = require('gulp');
var postcss = require('gulp-postcss');
var bs = require('browser-sync').create();

gulp.task('css', function () {
    return gulp.src('dev/css/*.css')
        .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
        .pipe( gulp.dest('build/css') );
});

gulp.task('js', function() {
    return gulp.src('dev/js/*.js')
	.pipe(gulp.dest('build/js'));
});

gulp.task('views', function () {
    return gulp.src('dev/*.html')
	.pipe(gulp.dest('build/'));
});

gulp.task('browser-sync', function() {
    bs.init({
	server: {
	    baseDir: "./build/"
	}
    });
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('dev/*', ['views']).on('change', bs.reload);;
    gulp.watch('dev/css/**/*', ['css']).on('change', bs.reload);;
    gulp.watch('dev/js/*', ['js']).on('change', bs.reload);;
});

gulp.task('default', ['css', 'js', 'views'],function() {

});
