const BaseError = require('../errors/base.error')
const authService = require('../services/auth.service')
const { validationResult } = require('express-validator')

class AuthController {
	async register(req, res, next) {
		try {
			const { email, password } = req.body
			const date = await authService.register(email, password)
			res.cookie('refreshTokken', date.refreshTokken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(date)
		} catch (e) {
			next(error)
		}
	}

	async activation(req, res, next) {
		try {
			const { id } = req.params
			await authService.activation(id)
			res.redirect('http://google.com')
		} catch (e) {
			next(error)
		}
	}

	async getAll(req, res, next) {
		try {
			const user = await authService.getAll()
			res.json(user)
		} catch (e) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const error = validationResult(req)
			if (!error.isEmpty()) {
				next(BaseError.BadRequest('Error with valitation', error.array()))
			}
			const data = await authService.login(email, password)
			res.cookie('refreshTokken', data.refreshTokken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(data)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshTokken } = req.cookies
			const token = await authService.logout(refreshTokken)
			res.clearCookie('refreshTokken')
			res.json({ token })
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshTokken } = req.cookies
			const refresh = await authService.refresh(refreshTokken)
			res.cookie('refreshTokken', refresh.refreshTokken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(refresh)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AuthController()
