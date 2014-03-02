var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

EventSchema = new Schema({
	thing_id: String,
	message:  String
});

EventSchema.methods = {

}

mongoose.model('Event', EventSchema);