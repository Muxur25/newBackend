const BaseError = require('../errors/base.error')

module.exports = function (err, req, res, next) {
	if (err instanceof BaseError) {
		return res
			.status(err.status)
			.json({ massage: err.message, error: err.errors })
	}

	return res.status(500).json({ massage: 'Server error' })
}
