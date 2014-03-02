var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

ThingSchema = new Schema({
	following:  Array
});

ThingSchema.methods = {
}

mongoose.model('Thing', ThingSchema);