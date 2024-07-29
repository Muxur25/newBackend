const personModels = require('../models/age.model')
const postService = require('../server/post.service')
class PostController {
	async getAll(req, res) {
		try {
			const allPost = await postService.getHammasi()
			console.log(req.reqTime)
			res.json(allPost)
		} catch (e) {
			res.json(e)
		}
	}

	async create(req, res) {
		try {
			const newPerson = await postService.posts(req.body, req.user.id) // req.files.picture beramiz 2 parametr sifatida
			res.status(201).json(newPerson)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	async delete(req, res) {
		try {
			const post = await postService.postDelete(req.params.id)
			res.status(201).json(post)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async edit(req, res) {
		try {
			const { body, params } = req
			const post = await postService.editPost(body, params.id)
			res.status(201).json(post)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getOne(req, res) {
		try {
			const get = await postService.getOne(req.params.id)
			res.status(201).json(get)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

module.exports = new PostController()
