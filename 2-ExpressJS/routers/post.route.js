const express = require('express')
const personModels = require('../models/age.model')
const router = express.Router()
const postController = require('../controllers/post.controller')
const logger = require('../middlewears/logger')
const authorMiddile = require('../../3-AdvancedBackend/middlewaere/avtor.middle')

const autMiddle = require('../../3-AdvancedBackend/middlewaere/author.middle')

router.get('/', postController.getAll)

router.post('/post', authorMiddile, autMiddle, postController.create)

router.delete('/del/:id', authorMiddile, autMiddle, postController.delete)

router.put('/edit/:id', authorMiddile, autMiddle, postController.edit)

router.get('/get/:id', postController.getOne)

module.exports = router
