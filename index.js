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
function concat(done) {
	// lazy loading required modules.
	var queue = require('gulp-ccr-queue');
	var gulpConcat = require('gulp-concat');

	var verify = require('gulp-ccr-helper').verifyConfiguration;
	var PluginError = require('gulp-util').PluginError;

	var context = this;
	var gulp = context.gulp;
	var config = context.config;
	var upstream = context.upstream;
	var tasks = context.tasks;
	var stream;

	verify(concat.schema, config);

	if (tasks.length !== 0) {
		stream = queue.call(context);
	} else {
		if (!upstream && !config.src) {
			throw new PluginError('concat', 'configuration property "src" is required, otherwise an up-stream must be provided')
		}
		stream = upstream || gulp.src(config.src.globs, config.src.options);
	}

	return stream
		.pipe(gulpConcat(config.file))
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
		}
	},
	required: ['dest', 'file']
};

concat.type = 'stream';

module.exports = concat;
