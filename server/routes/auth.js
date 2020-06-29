const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const register = require("../query/register")
const login = require('../query/login')
const tokens = require('../authHelpers/tokenAuth')
const {hashPassword} = require("../authHelpers/passwordManagement");
const {comparePasswords} = require("../authHelpers/passwordManagement");
const tokenAuth = require('../authHelpers/tokenAuth')
const sendEmail = require('../email/sendEmail')
const emailTemplate = require('../email/emailTemplate')
const crypto = require('crypto')
const emailMsgs = require('../email/emailMsgs')
router.post('/register', async (req, res) => {
    let {email, firstName, lastName, password, phoneNumber} = req.body
    try{
        const hashedPassword = await hashPassword(password, 10)
        const checkResult = await register.checkAccount(email)
        let messageToSend = null
        if (checkResult === 1){
            res.status(400)
            await res.json({msgs: emailMsgs.alreadyConfirm})
            return
        }else if (checkResult === 0){
            res.status(403)
            messageToSend = emailMsgs.resend
        }else {
            res.status(200)
            await register.register(email, firstName, lastName, password, phoneNumber)
        }
        const emailObj = {email: email}
        const accessToken = tokens.generateAccessToken(emailObj)
        const refreshToken = tokens.generateRefreshToken(emailObj)
        const random = crypto.randomBytes(64).toString('hex')
        await sendEmail(email, emailTemplate.confirm(random))
         res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            msgs: messageToSend
        })
    }catch (e) {
        res.status(401)
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
        else if (result[0].email_verified === false || result[0].email_verified === 0){
            res.status(403)
            const emailHash = await hashPassword(email, 10)
            await sendEmail(email, emailTemplate.confirm(emailHash))
            res.json({
                msgs: emailMsgs.resend
            })
        }
        else if ( await comparePasswords(password, result[0].password)){
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
        res.status(500)
        res.send({"error": e})
    }
})

router.put('/validate', tokenAuth.authToken , async (req, res) => {
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