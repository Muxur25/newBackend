module.exports = class UserDto {
	email
	password
	id
	ativade
	constructor(model) {
		this.email = model.email
		this.password = model.password
		this.id = model._id
		this.ativade = model.isActived
	}
}