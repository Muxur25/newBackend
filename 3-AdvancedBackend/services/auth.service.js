const authModel = require('../models/register.model')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto')
const tokkenService = require('./tokken.service')
const mailService = require('../services/mail.service')
const registerModel = require('../models/register.model')
const BaseError = require('../errors/base.error')

class AuthService {
	async register(email, password) {
		const emails = await authModel.findOne({ email })

		if (emails) {
			throw BaseError.BadRequest('Email allaqachon royxatdan otgan' + email)
		}

		const passHash = await bcrypt.hash(password, 10)

		const userCreate = await authModel.create({ email, password: passHash })

		const dtoU = new UserDto(userCreate) // faqat ozimizga kerakli malumotlarni qaytardik

		await mailService.sendMail(email, `${process.env.API_KEY}/activ/${dtoU.id}`)

		const tokkens = await tokkenService.genereteTokken({ ...dtoU })

		tokkenService
			.saveTokken(dtoU.id, tokkens.refreshTokken)
			.then(() => console.log('Yaxshi'))
			.catch(e => console.log(e))

		return { user: dtoU, ...tokkens }
	}

	async activation(id) {
		const user = await authModel.findById(id)
		if (!user) {
			throw BaseError.BadRequest('User is not defained')
		}

		user.isActived = true // qiymatini ozgartirdik
		await user.save() // malumotlar bazasiga saqladik
	}

	async getAll() {
		const user = await authModel.find()
		return user
	}

	async login(email, password) {
		const isEmail = await authModel.findOne({ email })
		if (!isEmail) {
			throw BaseError.BadRequest('Email is not defained')
		}

		const isPassword = await bcrypt.compare(password, isEmail.password)

		if (!isPassword) {
			throw BaseError.BadRequest('Password xato')
		}

		const userDto = new UserDto(isEmail)

		const tokkens = tokkenService.genereteTokken({ ...userDto })

		await tokkenService.saveTokken(userDto.id, tokkens.refreshTokken)

		return { user: userDto, ...tokkens }
	}

	async logout(refreshTokken) {
		return await tokkenService.clearToken(refreshTokken)
	}

	async refresh(refreshTokken) {
		if (!refreshTokken) {
			throw BaseError.BadRequest('Bad required')
		}

		const validationRefresh = tokkenService.valRefresh(refreshTokken)

		const dbRefresh = await tokkenService.signRefresh(refreshTokken)

		if (!validationRefresh || !dbRefresh) {
			throw BaseError.BadRequest('Bad required')
		}

		const user = await registerModel.findById(validationRefresh.id)

		const userDto = new UserDto(user)

		const tokkens = tokkenService.genereteTokken({ ...userDto })

		await tokkenService.saveTokken(userDto.id, tokkens.refreshTokken)

		return { user: userDto, ...tokkens }
	}
}

module.exports = new AuthService()
