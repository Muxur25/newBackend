require('dotenv').config()

// npm i bcrypt  --- parollarni hash qiymatga otkazish ucn ishlatilinadi

const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routers/auth.route')

const fileupload = require('express-fileupload')

const app = express()
const cookieParser = require('cookie-parser')
const errorMiddle = require('./middlewaere/error.middle')

app.use(cookieParser({}))

app.use(express.json())
app.use(express.static('static'))
app.use(fileupload({}))

app.use(auth)

app.use(errorMiddle)

const bootstrap = async () => {
	try {
		const DB = process.env.DB_URL
		await mongoose.connect(DB).then(() => console.log('DB connected'))
		await app.listen(process.env.PORT, () => console.log('Server is connected'))
	} catch (e) {
		throw new Error('Error ' + e)
	}
}

bootstrap()
