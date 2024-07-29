require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')







const requestTime = require('./middlewears/requestTime')
const app = express()

app.use(requestTime) // ana endi biz bu funcsiani metodlariga bemalol foydalansak boladi
// misol uchun req.reqTimedan

app.use(express.static('static')) // static papkani static qilib qoydik




const fileUpload = require('express-fileupload')

app.use(express.json())

// Router

const postRouter = require('./routers/post.route')

app.use(postRouter)

app.use(fileUpload({}))


// app.get('/', async (req, res) => {
// 	const allPost = await personModels.find()
// 	res.json(allPost)
// })
//
// app.post('/', async (req, res) => {
// 	try {
// 		const { title, body } = req.body
// 		const newPost = await postModels.create({ title, body })
// 		res.status(201).json(newPost)
// 	} catch (error) {
// 		res.status(500).json(error)
// 	}
// })
//
// app.get('/post', (req, res) => {
// 	res.status(404).json({ massage: 'hello' })
// })
//
// app.post('/hello', (req, res) => {
// 	const { firstname, lastname } = req.body
// 	const massage = `his full name ${firstname} ${lastname}`
// 	res.send(massage)
// })
//
// app.delete('/del/:id', (req, res) => {
// 	const { id } = req.params
// 	res.send(id)
// })
//
// app.put('/del/:id', (req, res) => {
// 	const { id } = req.params
// 	const { firstname } = req.body
// 	res.json({ id, firstname })
// })
//
// app.post('/person', async (req, res) => {
// 	try {
// 		const { name, age } = req.body
// 		const newPerson = await personModels.create({ name, age })
// 		res.status(201).json(newPerson)
// 	} catch (error) {
// 		res.status(500).json(error)
// 	}
// })

const DB_URL = process.env.DB_URL

const bootstrap = async () => {
	try {
		await mongoose.connect(DB_URL).then(() => console.log('Connect db'))
		app.listen(3000)
	} catch (error) {
		throw error
	}
}

bootstrap()
