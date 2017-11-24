var gulp = require('gulp');
var postcss = require('gulp-postcss');

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

var allTasks = ['css','js','views']
gulp.task('watch', function() {
    gulp.watch('dev/*', ['views']);
    gulp.watch('dev/css/**/*', ['css']);
    gulp.watch('dev/js/**/*', ['js']);
});

gulp.task('default', ['css', 'js', 'views'],function() {

});
