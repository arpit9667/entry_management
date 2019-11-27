const express = require('express')
const router = require('./utils/router')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000
require('./utils/connect')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'/frontend')));
app.use(router)

app.listen(port,() => {
    console.log("server is running on port no." + port)
})