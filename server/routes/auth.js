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
const resetPasswordTemplate = require('../email/resetPasswordTemplate')
const crypto = require('crypto')
const emailMsgs = require('../email/emailMsgs')
router.post('/register', async (req, res) => {
    let {email, firstName, lastName, password, phoneNumber} = req.body
    try{
        const hashedPassword = await hashPassword(password, 10)
        await register.register(email, firstName, lastName, hashedPassword, phoneNumber)
        const emailObj = {email: email}
        const registerToken = tokens.generateRegisterToken(emailObj)
        const random = crypto.randomBytes(64).toString('hex')
        await sendEmail(email, emailTemplate.confirm(random))
         res.json({
            registerToken: registerToken,
            msgs: emailMsgs.confirm
        })
    }catch (e) {
        res.status(403)
            .send({msgs: "Email has been already submitted"})
    }
})

router.post('/login', async (req, res) => {
    let {email, password} = req.body
    console.log(email)
    try {
        const result = await login.login(email)
        if (result.length === 0){
            res.status(404)
            res.send({error: "User Not found"})
        }
        else if (result[0].email_verified === false || result[0].email_verified === 0){
            res.status(403)
            const emailHash = await hashPassword(email, 10)
            await sendEmail(email, emailTemplate.confirm(emailHash))
            res.json({
                error: emailMsgs.resend
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

router.put('/validate', tokenAuth.registerTokenAuth , async (req, res) => {
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

router.post('/request-reset-password', async (req, res) => {
    const {email} = req.body.email
    if (email === null) return res.status(404).send({msgs: "email must be filled"})
    const resetPasswordToken = await tokenAuth.generateResetPasswordToken(email)
    const random = crypto.randomBytes(64).toString('hex')
    await sendEmail(email, resetPasswordTemplate.reset(random))
    res.send({resetPasswordToken: resetPasswordToken})
})

router.post('/resetPassword', tokenAuth.resetPasswordTokenAuth, async (req, res) => {
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