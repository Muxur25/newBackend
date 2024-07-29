const express = require('express')

const app = express()

const PORT = 8080

app.listen(PORT, () => console.log(`Server in listen http://localhost:${PORT}`))
