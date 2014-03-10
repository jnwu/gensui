var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

EventSchema = new Schema({
	thing_name: String,
	message:  String
});

EventSchema.methods = {

}

mongoose.model('Event', EventSchema);