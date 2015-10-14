'use strict';

module.exports = {
    app: {
	title: 'NoteSharer',
	description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
	keywords: 'MongoDB, Express, AngularJS, Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    assets: {
	lib: {
	    css: [
	    ],
	    js: [
		'public/lib/angular/angular.js',
		'public/lib/angular-resource/angular-resource.js', 
		'public/lib/angular-touch/angular-touch.js', 
		'public/lib/angular-sanitize/angular-sanitize.js', 
		'public/lib/angular-ui-router/release/angular-ui-router.js',
		'public/lib/angular-ui-utils/ui-utils.js',
		'public/lib/angular-toaster/toaster.js'
	    ]
	},
	css: [
	    'public/modules/**/css/*.css',
	    'public/lib/**/*.css'
	],
	js: [
	    'public/config.js',
	    'public/application.js',
	    'public/modules/*/*.js',
	    'public/modules/*/*[!tests]*/*.js'
	],
	tests: [
	    'public/lib/angular-mocks/angular-mocks.js',
	    'public/modules/*/tests/*.js'
	]
    }
};
