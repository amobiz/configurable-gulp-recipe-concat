'use strict';

var schema = {
	title: 'concat',
	description: 'Concatenates streams.',
	properties: {
		file: {
			description: 'Give concatenated stream a new file name.',
			type: 'string'
		},
		spit: {
			description: 'Optional. Whether to write out file or not. Useful when piping stream for further processing. Default is true.',
			type: 'boolean',
			default: true
		}
	},
	required: ['file']
};

function concat() {
	// lazy loading required modules.
	var queue = require('gulp-ccr-queue');
	var gulpConcat = require('gulp-concat');

	var verify = require('gulp-ccr-config-helper');
	var PluginError = require('gulp-util').PluginError;

	var gulp = this.gulp;
	var config = this.config;
	var upstream = this.upstream;
	var tasks = this.tasks || [];
	var stream;

	verify(schema, config);

	if (tasks.length) {
		stream = queue.call(this);
	} else if (upstream) {
		stream = upstream;
	} else if (config.src) {
		stream = gulp.src(config.src.globs, config.src.options);
	} else {
		throw new PluginError('concat', 'configuration property "src" is required, otherwise an up-stream must be provided');
	}

	stream = stream.pipe(gulpConcat(config.file));

	if ('spit' in config && !config.spit) {
		return stream;
	}

	return stream
		.pipe(gulp.dest(config.dest.path, config.dest.options));
}

module.exports = concat;
module.exports.schema = schema;
module.exports.type = 'stream';
