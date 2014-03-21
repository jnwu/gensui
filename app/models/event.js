var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

EventSchema = new Schema({
	thing_name: String,
	message:  String,
	created: { type: Date, default: Date.now }
});

EventSchema.methods = {

}

mongoose.model('Event', EventSchema);