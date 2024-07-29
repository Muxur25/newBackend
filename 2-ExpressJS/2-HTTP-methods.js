// 1 GET --- malumot olish
// 2 POST --- malumot yuborish
// 3 PUT ---- yuborgan malumotni ozgartirish
// 4 DELETE --- malumotlar bazasidagi narsani o'chirib yuboradi
// 5 PATCH ---- hamma malumotni ozgartiradi

// Status Code
//  successfully response  200-299
// redirect yani foy admin panelga kirmoqchi lkn u admin emas 300-399
// clent error 404  400-499
// server error 500-599

const DB_URL =
	'mongodb+srv://muxur:qctCBBGOmLSeLYf9@cluster0.41bpylg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.get('/post', (req, res) => {
	res.status(404).json({ massage: 'hello' })
})

app.post('/hello', (req, res) => {
	const { firstname, lastname } = req.body
	const massage = `his full name ${firstname} ${lastname}`
	res.send(massage)
})

app.delete('/del/:id', (req, res) => {
	const { id } = req.params
	res.send(id)
})

app.put('/del/:id', (req, res) => {
	const { id } = req.params
	const { firstname } = req.body
	res.json({ id, firstname })
})

app.listen(3000)
