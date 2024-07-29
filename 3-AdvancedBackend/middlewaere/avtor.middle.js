const BaseError = require('../errors/base.error')
const postModel = require('../models/post.model')

module.exports = async function (req, res, next) {
	try {
		const postModelId = await postModel.findById(req.params.id)

		const id = req.user.id

		if (id !== postModel) {
			return next(BaseError.Xato('Siz author emassz'))
		}

		next()
	} catch (error) {
		return next(
			BaseError.Xato('Siz royxatdan otmay turib malumotni ozgartira olmaysz')
		)
	}
}
