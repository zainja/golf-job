const express = require('express')
const dotenv = require('dotenv')
const register = require('routes/auth')
const token = require('routes/token')
const port = 5000 | process.env.PORT
const app = express()
app.use(express.json)
app.use(express.urlencoded({extended: false}))
app.get("/" , (req,res) => {
    res.send("Server Working")
})

app.use("/auth", register)
app.use("/token", token)
app.listen(port)