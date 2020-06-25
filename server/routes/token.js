const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const tokenAuth = require('../tokens/tokenAuth')
app.post('/', (req, res) => {
    const token = req.body.token
    if (token === null) return res.status(401).send({error: "login expired"})
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, result) =>{
        if (err) res.status(403).send({error: "session expired"})
        const accessToken = tokenAuth.generateAccessToken({email: result.email})
        res.json(accessToken)
    })
})