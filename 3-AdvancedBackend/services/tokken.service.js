const jwd = require('jsonwebtoken')
const tokkenModel = require('../models/tokken.model')
class TokkenService {
	genereteTokken(payload) {
		const acsessTokken = jwd.sign(payload, process.env.ACSESS_TOKKEN, {
			expiresIn: '15m',
		})
		// yangi tokken jeneret qilyapmiz birinchisiga malumotlar ikkinchisiga kalit soz va keyingisi necha minut faol bolishi bu tokken
		const refreshTokken = jwd.sign(payload, process.env.REFRESH_TOKKEN, {
			expiresIn: '30d',
		})

		return { acsessTokken, refreshTokken }
	}

	async saveTokken(userId, refreshTokken) {
		const user = await tokkenModel.findOne({ user: userId })

		if (user) {
			user.refreshTokken = refreshTokken
			return user.save()
		}

		const tokken = await tokkenModel.create({ user: userId, refreshTokken })

		return tokken
	}

	async clearToken(refreshTokken) {
		return await tokkenModel.findOneAndDelete({ refreshTokken })
	}

	valRefresh(refreshTokken) {
		try {
			return jwd.verify(refreshTokken, process.env.REFRESH_TOKKEN)
		} catch (error) {
			return null
		}
	}

	valAcsess(AcsessTokken) {
		try {
			return jwd.verify(AcsessTokken, process.env.ACSESS_TOKKEN)
		} catch (error) {
			return null
		}
	}

	async signRefresh(refreshTokken) {
		return tokkenModel.findOne({ refreshTokken })
	}
}

module.exports = new TokkenService()
