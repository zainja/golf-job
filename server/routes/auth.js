const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const register = require("../query/register")
const login = require('../query/login')
const tokens = require('../authHelpers/tokenAuth')
const {hashPassword} = require("../authHelpers/passwordManagement");
const {comparePasswords} = require("../authHelpers/passwordManagement");
const tokenAuth = require('../authHelpers/tokenAuth')

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
    console.log(email)
    try {
        const result = await login.login(email)
        if (result.length === 0){
            res.status(404)
            res.send({error: "Incorrect email or password"})
        }
        if ( await comparePasswords(password, result[0].password)){
            emailObj = {
                email: email
            }
            const accessToken = tokens.generateAccessToken(emailObj)
            const refreshToken = tokens.generateRefreshToken(emailObj)
            await res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }else {
            res.status(401)
            res.send({error: "Incorrect email or password"})
        }
    }catch (e) {
        console.log("Dsdsdsds")
        res.status(500)
        res.send({"error": e})
    }
})

router.get('/validate', tokenAuth.authToken , async (req, res) => {
    const {email} = req.email
    try {
        await register.validateEmail(email)
        res.status(200)
        res.send({success: "Verified"})
    }catch (e) {
        res.status(401)
        res.send({error: "verification failed"})
    }
})

router.post('/resetPassword', tokenAuth.authToken, async (req, res) => {
    const {email} = req.email
    const {password} = req.body
    try {
        const newPassword = await hashPassword(password,10)
        await login.resetPassword(email, password)
        res.send({"success": "Password is set"})
    }catch (e) {
        res.send(e)
    }
})
module.exports = router