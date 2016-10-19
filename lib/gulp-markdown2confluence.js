'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var markdown2confluence = require('markdown2confluence');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-markdown2confluence', 'Streaming not supported'));
			return;
		}

    file.contents = new Buffer(markdown2confluence(file.contents.toString()));
    file.path = gutil.replaceExtension(file.path, '.confluence.txt');
    cb(null, file);
	});
};

module.exports.markdown2confluence = markdown2confluence;
