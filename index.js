'use strict';

/**
 * Recipe:
 * 	Serial Join (from gulp.js cheatsheet p.2)
 *
 * Ingredients:
 * 	streamqueue
 * 	gulp-concat
 *
 */
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

	verify(concat.schema, config);

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

concat.schema = {
	title: 'concat',
	description: 'Concatenates files',
	properties: {
		src: {
			description: '',
			type: 'glob'
		},
		dest: {
			description: '',
			type: 'path'
		},
		file: {
			description: '',
			type: 'string'
		},
		spit: {
			description: '',
			type: 'boolean',
			default: true
		}
	},
	required: ['dest', 'file']
};

concat.type = 'stream';

module.exports = concat;
