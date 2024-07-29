const {model, Schema} = require('mongoose')


const tokkenSchema = new Schema({
	user: {type: Schema.ObjectId, ref:"user"},
	refreshTokken: {type:String, required:true}
})

module.exports = model('Tokken', tokkenSchema)