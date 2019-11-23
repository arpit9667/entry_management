const express = require('express')
const router = require('./utils/router')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
require('./utils/connect')

app.use(router)

app.listen(port,() => {
    console.log("server is running on port no." + port)
})