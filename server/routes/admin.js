const express = require('express')
const admin = require('../query/admin')
const tokenAuth = require('../authHelpers/tokenAuth')
const {comparePasswords} = require("../authHelpers/passwordManagement");
const {hashPassword} = require("../authHelpers/passwordManagement");
const {generateAdminAccessToken} = require("../authHelpers/generateTokens");
const router = express.Router()
router.post("/create-user", tokenAuth.adminAccessToken, async (req, res) => {
    const {role} = req.userObj
    if (role === "admin") {
        try {
            const {username, firstName, lastName, userRole} = req.body
            await admin.register(username, firstName, lastName, userRole)
            res.send({msgs: "user created"})
        } catch (e) {
            res.status(500).send({msgs: "user may already exist"})
        }
    }
    res.status(401).send({msgs: "You cannot create a user"})
})

router.post("/enter-user", async (req, res) => {
    const username = req.body.username
    try{
        const user = await admin.enterUser(username)
        res.send({hasPassword: user.password !== null})
    }catch (e) {
        res.status(404).send(e)
    }
})

router.put("/enter-password", async (req, res) => {
    const {username, hasPassword, password} = req.body
    try {
        if (!hasPassword){
            const passwordHash = hashPassword(password, 10)
            await admin.resetPassword(username, passwordHash)
            const token = generateAdminAccessToken(username, user[0].role)
            res.send({adminAccessToken: token})
        }else {
            const user = admin.enterUser(username)
            if(await comparePasswords(password, user[0].password)){
                const token = generateAdminAccessToken(username, user[0].role)
                res.send({adminAccessToken: token})
            }else{
                res.send({msgs: "password is incorrect"})
            }
        }
    } catch (e) {
        res.status(404)
        res.send({msgs: "user not found"})
    }
})

module.exports = router