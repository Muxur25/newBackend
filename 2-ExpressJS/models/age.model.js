const { model, Schema } = require('mongoose')

const personSchema = new Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	// picture: {type: String} rasm ucun yangi schema yaratamiz
}, {timestamps:true})
// timestamps bizga post create qilayotganimizda update date bn create date qoshib beradi


module.exports = model('Person', personSchema)
