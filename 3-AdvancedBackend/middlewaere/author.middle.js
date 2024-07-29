const BaseError = require('../errors/base.error')
const tokkenService = require('../services/tokken.service')

module.exports = function (req, res, next) {
	try {
		const author = req.headers.authorization

		if (!author) {
			return next(BaseError.Unautoreg())
		}

		const acsessToken = author.split(' ')[1]
		if (!acsessToken) {
			return next(BaseError.Unautoreg())
		}

		const userData = tokkenService.valAcsess(acsessToken)

		if (!userData) {
			return next(BaseError.Unautoreg())
		}

		req.user = userData
		next()
	} catch (error) {
		return next(BaseError.Unautoreg())
	}
}
