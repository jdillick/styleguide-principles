var gulp = require('gulp');
var debug = require('gulp-debug');
var md = require('gulp-markdown');
var md2confluence = require('./lib/gulp-markdown2confluence');
var replace = require('gulp-replace');
var wrapper = require('gulp-wrapper');
var prettify = require('gulp-html-prettify');
var del = require('del');

var config = {
  mdSrc: ['**/*.md', '!node_modules/**', '!bower_components/**'],
  wrapper: {
    header: '<!DOCTYPE html><html lang="en"><head></head><body>',
    footer: '</body></html>'
  }
};

gulp.task('build', ['clean', 'confluence', 'html']);

gulp.task('clean', function(){
  return del([
    'confluence',
    'html'
  ]);
});

gulp.task('confluence', function(){
  return gulp.src(config.mdSrc)
    .pipe(debug())
    .pipe(md2confluence())
    .pipe(gulp.dest('confluence'));
});

gulp.task('html', function(){
  return gulp.src(config.mdSrc)
    .pipe(debug())
    .pipe(md())
    .pipe(replace('.md', '.html'))
    .pipe(wrapper(config.wrapper))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('html'));
});

gulp.task('watch', function(){
  gulp.watch(config.mdSrc, ['build']);
});

gulp.task('default', ['build', 'watch']);
