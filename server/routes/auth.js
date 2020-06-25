const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const register = require("../query/register")
const login = require('../query/login')
const tokens = require('../tokens/tokenAuth')
router.post('/register', async (req, res) => {
    let {email, firstName, lastName, password, phoneNumber} = req.body
    try{
        const hashedPassword = await hashPassword(password, 10)
        await register.register(email, firstName, lastName, hashedPassword, phoneNumber)
        const emailObj = {email: email}
        const accessToken = tokens.generateAccessToken(emailObj)
        const refreshToken = tokens.generateRefreshToken(emailObj)
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    }catch (e) {
        res.status(401)
        res.send({"error": e})
    }
})

router.post('/login', async (req, res) => {
    let {email, password} = req.body
    try {
        const result = await login.login(email, password)
        if ( await comparePasswords(password, result[0].password)){
            res.status(200)
        const accessToken = tokens.generateAccessToken(emailObj)
        const refreshToken = tokens.generateRefreshToken(emailObj)
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })
        }
    }catch (e) {
        res.status(400)
        res.send({"error": e})
    }
})


const hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

const comparePasswords = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}