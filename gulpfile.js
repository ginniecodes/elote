const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('bundle', function() {
  const presets = {presets: ['es2015', 'react']};
  browserify('scripts/index.js').transform(babel, presets).bundle().pipe(source('bundle.js')).pipe(gulp.dest('views'));
});

gulp.task('default', ['bundle'], function(){
	gulp.watch('./scripts', ['bundle']);
})
