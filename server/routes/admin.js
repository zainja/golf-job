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
        console.log(user.password !== null)
        res.send({hasPassword: user.password !== null})
    }catch (e) {
        res.status(404).send(e)
    }
})

router.post("/enter-password", async (req, res) => {
    const {username, hasPassword, password} = req.body
    try {
        if (!hasPassword){
            const passwordHash = await hashPassword(password, 10)
            await admin.resetPassword(username, passwordHash)
        }
        const user = await admin.enterUser(username)
        console.log(user)
        if(await comparePasswords(password, user.password)){
            console.log(true)
            const token = generateAdminAccessToken(username, user.role)
            res.send({adminAccessToken: token, role: user.role})
        }else{
            res.status(400).send({msgs: "password is incorrect"})
        }
    } catch (e) {
        res.status(404)
        res.send({msgs: "user not found"})
    }
})

module.exports = router