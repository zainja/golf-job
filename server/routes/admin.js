const express = require('express')
const tokenAuth = require('../authHelpers/tokenAuth')
const {comparePasswords} = require("../authHelpers/passwordManagement");
const {hashPassword} = require("../authHelpers/passwordManagement");
const onUserOperations = require('../query/onUsersOperations')
const sendEmail = require('../email/sendEmail')
const emailTemplate = require('../email/emailTemplate')
const emailMsgs = require("../email/emailMsgs");
const user = require("../query/user");
const crypto = require('crypto')
const {generateAccessToken} = require("../authHelpers/generateTokens");
const {generateRegisterToken} = require("../authHelpers/generateTokens");
const router = express.Router()

router.post("/register", async (req, res) => {
    const {email, firstName, lastName, password, phoneNumber} =req.body
    try {
        const hashedPassword = await hashPassword(password, 10)
        await user.registerAsAdmin(email, firstName, lastName, hashedPassword, phoneNumber)
        const registerToken = generateRegisterToken(email)
        const random = crypto.randomBytes(64).toString('hex')
        await sendEmail(email, emailTemplate.confirm(random))
         res.send({
            registerToken: registerToken,
            msgs: emailMsgs.confirm
        })
    }catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.post('/login', async (req, res) => {
        let {email, password} = req.body
    try {
        const result = await user.loginAdmin(email)
        if (result.length === 0){
            res.status(404)
            res.send({error: "User Not found"})
        }
        else if (result[0].email_verified === false || result[0].email_verified === 0){
            res.status(403)
            const random = crypto.randomBytes(64).toString('hex')
            await sendEmail(email, emailTemplate.confirm(random))
            res.send({
                msgs: emailMsgs.resend
            })
        }
        else if ( await comparePasswords(password, result[0].password)){
            const token = await generateAccessToken(email, true)
            res.send({accessToken: token,
                firstName: result[0].first_name,
                lastName: result[0].last_name,
                phoneNumber: result[0].phone_number,
                isAdmin: true,
                msgs: "user login successfully"})
        }else {
            res.status(401)
            res.send({msgs: "Incorrect email or password"})
        }
    }catch (e) {
        res.status(500)
        res.send({msgs: "couldn't log the user in"})
    }
})

router.get('/users/All', tokenAuth.authToken, async (req, res) => {
    if (!req.isAdmin){
        res.code(403).send({msgs: "access forbidden"})
        return
    }
    try{
        const users = await onUserOperations.getAllUsers()
        res.send({users: users})
    }catch (e) {
        res.send(e)
    }
})

router.get('/user/f/:firstName', tokenAuth.authToken, async (req, res) => {
    if (!req.isAdmin){
        res.code(403).send({msgs: "access forbidden"})
        return
    }
    try{
        const user = await onUserOperations.getUserByFirstName(req.params.firstName)
    }catch (e) {
        res.send(e)
    }
})

router.get('/user/l/:lastName',tokenAuth.authToken, async (req, res) => {
    if (!req.isAdmin){
        res.code(403).send({msgs: "access forbidden"})
        return
    }
    try{
        const user = await onUserOperations.getUserByLastName(req.params.lastName)
    }catch (e) {
        res.send(e)
    }
})
module.exports = router