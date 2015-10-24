'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Note Schema
 */
var NoteSchema = new Schema({
    name: {
	type: String,
	default: '',
	required: 'Please fill Note name',
	trim: true
    },
    description: {
	type: String,
	default: '',
	required: 'Please fill Note description',
	trim: true
    },
    created: {
	type: Date,
	default: Date.now
    },
    public: {
	type:Boolean,
	defautl: false
    },
    user: {
	type: Schema.ObjectId,
	ref: 'User'
    }
});

mongoose.model('Note', NoteSchema);
