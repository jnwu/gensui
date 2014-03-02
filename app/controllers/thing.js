var mongoose = require('mongoose')
	, Thing = mongoose.model('Thing');

exports.read = function(req, res){
	if(req.params.id) {
		Thing.find({ _id: req.params.id }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	} else {
		Thing.find({ _id: req.params.id }, function(err, result) {
			if(err){
				res.json(err);
			} else {
				res.json(result);
			}
		});
	}
};

exports.create = function(req, res){
	var a = new Thing({ following: req.body.thing.following });
	a.save(function(err) {
		if(err) {
			res.json(err);
		}
	});
	res.json(a);
};