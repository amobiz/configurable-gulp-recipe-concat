'use strict';

/**
 * Recipe:
 * 	Serial Join (from gulp.js cheatsheet p.2)
 *
 * Ingredients:
 * 	streamqueue
 * 	gulp-concat
 *
 * @param gulp the gulp instance running this task
 * @param config configuration for the task
 * @param stream up-stream, if not null, the task must handle source from the stream
 * @param tasks configurable sub-tasks
 *
 */
function concat() {
	// lazy loading required modules.
	var queue = require('gulp-ccr-queue');
	var gulpConcat = require('gulp-concat');

	var verify = require('gulp-ccr-helper').verifyConfiguration;
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
			description: ''
		},
		dest: {
			description: ''
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
