'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var bs = require('browser-sync').create();


gulp.task('css', function () {
    return gulp.src('dev/css/*.css')
    	.pipe( concat('main.css') )
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

gulp.task('watch', gulp.series('browser-sync', function(done) {
    gulp.watch('dev/*', ['views']).on('change', bs.reload);
    gulp.watch('dev/css/**/*', ['css']).on('change', bs.reload);
    gulp.watch('dev/js/*', ['js']).on('change', bs.reload);
    done();
}));

gulp.task('default', gulp.series('css', 'js', 'views', function(done) {
    done();
}));
