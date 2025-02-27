const express = require('express')
const router = express.Router()
const user = require("../query/user")
const {hashPassword} = require("../authHelpers/passwordManagement");
const {comparePasswords} = require("../authHelpers/passwordManagement");
const tokenAuth = require('../authHelpers/tokenAuth')
const sendEmail = require('../email/sendEmail')
const emailTemplate = require('../email/emailTemplate')
const resetPasswordTemplate = require('../email/resetPasswordTemplate')
const crypto = require('crypto')
const emailMsgs = require('../email/emailMsgs')
const {getAllAdmin} = require("../query/onUsersOperations");
const {generateResetPasswordToken,
    generateRegisterToken,
    generateRefreshToken,
    generateAccessToken} = require("../authHelpers/generateTokens");
router.post('/register', async (req, res) => {
    let {email, firstName, lastName, password, phoneNumber} = req.body
    try{
        const hashedPassword = await hashPassword(password, 10)
        await user.register(email, firstName, lastName, hashedPassword, phoneNumber)
        const registerToken = generateRegisterToken(email)
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
    try {
        const result = await user.login(email)
        if (result.length === 0){
            res.status(404)
            res.send({msgs: "User Not found"})
        }
        else if (result[0].email_verified === false || result[0].email_verified === 0){
            res.status(403)
            const random = crypto.randomBytes(64).toString('hex')
            await sendEmail(email, emailTemplate.confirm(random))
            const registerToken = generateRegisterToken(email)
            res.json({
                msgs: emailMsgs.resend,
                registerToken: registerToken
            })
        }
        else if ( await comparePasswords(password, result[0].password)){
            const accessToken = generateAccessToken(email, false)
            await res.json({
                accessToken: accessToken,
                msgs: "login successful",
                isAdmin: false,
                firstName: result[0].first_name,
                lastName: result[0].last_name,
                phoneNumber: result[0].phone_number,
            })
        }else {
            res.status(401)
            res.send({msgs: "Incorrect email or password"})
        }
    }catch (e) {
        res.status(500)
        res.send({msgs: e})
    }
})

// shared between user and admin
router.put('/validate', tokenAuth.registerTokenAuth , async (req, res) => {
    const email = req.email
    try {
        await user.validateEmail(email)
        res.status(200)
        res.send({msgs: "Verified"})
    }catch (e) {
        res.status(401)
        res.send({msgs: "verification failed"})
    }
})

router.post('/request-reset-password', async (req, res) => {
    const {email} = req.body
    if (email === null) return res.status(404).send({msgs: "email must be filled"})
    try {
        const resetPasswordToken = generateResetPasswordToken(email)
        const random = crypto.randomBytes(64).toString('hex')
        await sendEmail(email, resetPasswordTemplate.reset(random))
        res.send({resetPasswordToken: resetPasswordToken})
    }catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.post('/reset-password', tokenAuth.resetPasswordTokenAuth, async (req, res) => {
    const email = req.email
    const {password} = req.body
    console.log(email)
    console.log(password)
    try {
        const newPassword = await hashPassword(password,10)
        await user.resetPassword(email, newPassword)
        res.send({"success": "Password is set"})
    }catch (e) {
        res.sendStatus(500)
    }
})

router.get('/AllMentors', tokenAuth.authToken, async (req, res) => {
    try{
        const admins = await getAllAdmin()
        console.log(admins)
        res.send({mentors: admins})
    }catch (e) {
        console.log(e)
        res.send({msgs: "cannot get mentors"})
    }
})
module.exports = router