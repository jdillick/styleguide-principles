var gulp = require('gulp');
var debug = require('gulp-debug');
var md = require('gulp-markdown');
var md2confluence = require('gulp-markdown2confluence');
var replace = require('gulp-replace');
var wrapper = require('gulp-wrapper');
var prettify = require('gulp-html-prettify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var path = require('path');

var config = {
  htmlDest: 'docs',
  confluenceDest: 'confluence',
  mdSrc: ['**/*.md', '!node_modules/**', '!bower_components/**'],
  wrapper: {
    header: '<!DOCTYPE html><html lang="en"><head><title>{{TITLE}}</title><link rel="stylesheet" type="text/css" href="{{CSSPATH}}css/splendor.css"></head><body>',
    footer: '</body></html>'
  },
  marked: {
    gfm: true
  },
  title: 'Styleguide/Stylesheet Principles'
};

gulp.task('build', ['clean', 'confluence', 'html', 'style']);

gulp.task('clean', function(){
  return del([
    config.confluenceDest + '/**/*',
    config.htmlDest + '/**/*'
  ]);
});

gulp.task('confluence', function(){
  return gulp.src(config.mdSrc)
    .pipe(debug())
    .pipe(md2confluence())
    .pipe(gulp.dest(config.confluenceDest));
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

gulp.task('html', function(){
  return gulp.src(config.mdSrc)
    .pipe(debug())
    .pipe(md(config.marked))
    .pipe(replace('.md', '.html'))
    .pipe(wrapper({
      header: function(file) {
        var prefix = ''
        for(var i = 0; i < path.relative(__dirname, file.path).split(/\//).length - 1; i++ ) {
          prefix += '../';
        }

        var titleName = toTitleCase(path.parse(file.path).name.replace(/-/, ' '));
        if (titleName === 'Index') {
          titleName = '';
        } else {
          titleName = ': ' + titleName;
        }

        var header = config.wrapper.header
          .replace(/\{\{CSSPATH\}\}/, prefix)
          .replace(/\{\{TITLE\}\}/, config.title + titleName);

        return header;
      },
      footer: config.wrapper.footer}))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(config.htmlDest));
});

gulp.task('style', function(){
  return gulp.src('css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.htmlDest + '/css'));
});

gulp.task('watch', function(){
  gulp.watch(config.mdSrc, ['build']);
  gulp.watch('css/**/*.css', ['build']);
});

gulp.task('default', ['build', 'watch']);
