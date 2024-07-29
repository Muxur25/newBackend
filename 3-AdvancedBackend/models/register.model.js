const {model, Schema} = require('mongoose')


const UserSchema = new Schema({
	email: {type:String, required:true, unique: true }, // unique bu faqat bitta shunday email bor dbda
	password: {type:String, required:true},
	isActived: {type: Boolean, default:false}
}, {timestamps: true})



module.exports = model("User", UserSchema)