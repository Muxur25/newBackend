const requestTime = function(req, res, next){
	req.reqTime = Date.now() // request vaqt yuborish
	next() // va keyingi funksiyaga otishga ruhsat berish
}

module.exports = requestTime