const express = require('express')

const router = express.Router()
const { body } = require('express-validator')
const authController = require('../controllers/auth.controller')
const authorMiddle = require('../middlewaere/author.middle')

router.post('/auth', authController.register)
router.get('/activ/:id', authController.activation)

router.get('/', authorMiddle, authController.getAll)

router.post(
	'/login',
	body('password').isLength({ min: 3, max: 15 }),
	body('email').isEmail(),
	authController.login
)

router.post('/logout', authController.logout)

router.get('/refresh', authController.refresh)

module.exports = router
