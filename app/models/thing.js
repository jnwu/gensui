var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

ThingSchema = new Schema({ 
	name: String, 
	following: Array 
});

ThingSchema.methods = {
}

mongoose.model('Thing', ThingSchema);