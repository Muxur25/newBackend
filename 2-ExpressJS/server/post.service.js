const personModels = require('../models/age.model')

const fileService = require('./file.service')

class PostService {
	async posts(post, picture, author) {
		const newPerson = await personModels.create({ ...post, author }) //picture: servi deb beramiz 2 parametr sifatida
		return newPerson
	}

	async getHammasi() {
		const allPost = await personModels.find()
		return allPost
	}

	async postDelete(id) {
		const postDel = await personModels.findByIdAndDelete(id)
		return postDel
	}

	async editPost(post, id) {
		const postEdit = await personModels.findByIdAndUpdate(id, post)
		return postEdit
	}

	async getOne(id) {
		const one = await personModels.findById(id)
		return one
	}
}

module.exports = new PostService()
