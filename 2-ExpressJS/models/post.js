const { model, Schema } = require('mongoose')

const postSchema = new Schema({
	author: { type: Schema.ObjectId, ref: 'user' },
	title: { type: String, required: true },
	body: { type: String, required: true },
})
// yangi schema royxatdan otkazdik unda title va bodylar boladi
//required digani body bolishi kerak digani

module.exports = model('Posts', postSchema) // va uni export qilib yubordik
