const express = require('express')
const dotenv = require('dotenv')
const port = 5000 | process.env.PORT
const app = express()
app.use(express.json)
app.use(express.urlencoded({extended: false}))
app.get("/" , (req,res) => {
    res.send("Server Working")
})
app.listen(port)