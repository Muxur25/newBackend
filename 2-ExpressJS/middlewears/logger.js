const logger = function(req, res, next){
	console.log("Person created")
	next()
}


module.exports = logger