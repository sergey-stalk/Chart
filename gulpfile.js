var gulp = require('gulp'), 
	sass = require('gulp-sass'),
	server = require('gulp-server-livereload');
 
gulp.task('webserver', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false,
      defaultFile: 'index.html'
    }));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
	gulp.watch(['sass/**/*.scss', 'sass/**/*.sass', 'js/**/*.js', '*.html'],['sass']);
});

gulp.task('default', ['watch', 'webserver']);

 


