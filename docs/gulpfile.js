const gulp = require('gulp');
const terser = require('gulp-terser');

gulp.task('minify-js', function () {
    return gulp.src('./assets/js/*.js') // Source files
        .pipe(terser()) // Minify
        .pipe(gulp.dest('./assets/js/minified')); // Output folder
});