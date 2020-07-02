const express = require('express')
const admin = require('../query/admin')
const tokenAuth = require('../authHelpers/tokenAuth')
const {comparePasswords} = require("../authHelpers/passwordManagement");
const {hashPassword} = require("../authHelpers/passwordManagement");
const {generateAdminAccessToken} = require("../authHelpers/generateTokens");
const sendEmail = require('../email/sendEmail')
const emailTemplate = require('../email/emailTemplate')
const emailMsgs = require("../email/emailMsgs");
const router = express.Router()

router.post('/login', async (req, res) => {
        let {email, password} = req.body
    try {
        const result = await user.login(email)
        if (result.length === 0){
            res.status(404)
            res.send({error: "User Not found"})
        }
        else if (result[0].email_verified === false || result[0].email_verified === 0){
            res.status(403)
            const random = crypto.randomBytes(64).toString('hex')
            await sendEmail(email, emailTemplate.confirm(random))
            res.json({
                msgs: emailMsgs.resend
            })
        }
        else if ( await comparePasswords(password, result[0].password)){
            const token = await generateAdminAccessToken(email)
            res.send({adminAccessToken: token, msgs: "user login successfully"})
        }else {
            res.status(401)
            res.send({msgs: "Incorrect email or password"})
        }
    }catch (e) {
        res.status(500)
        res.send({msgs: "couldn't log the user in"})
    }
})

module.exports = router