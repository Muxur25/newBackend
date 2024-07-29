module.exports = class BaseError extends Error {
	status
	errors
	constructor(status, massage, errors) {
		super(massage)
		this.status = status
		this.errors = errors
	}

	static Unautoreg() {
		return new BaseError(401, 'User is not autoregister')
	}

	static BadRequest(massage, errors = []) {
		return new BaseError(400, massage, errors)
	}
}
