const express = require('express')
const router = express.Router()
const messagesQuery = require('../query/messagesQuery')
const tokenAuth = require('../authHelpers/tokenAuth')
router.post('/userSendMessage',tokenAuth.authToken, async (req, res) => {
    const {email} = req.email
    const {receiver, message} = req.body
    try{
        await messagesQuery.sendMessage(email, receiver, message)
        res.send({msgs: "message send"})
    }catch (e) {
        res.send(e)
    }
})

router.post('/adminSendMessage', tokenAuth.adminAccessToken, async (req, res) => {
    const {email} = req.email
    const {receiver, message} = req.body
    try{
        await messagesQuery.sendMessage(email, receiver, message)
        res.send({msgs: "message send"})
    }catch (e) {
        res.send(e)
    }
})

router.post('/userGetMessages',tokenAuth.authToken, async (req, res) => {
    const {email} = req.email
    const {user} = req.body
    try{
        const messages = await messagesQuery.receiveAllMessages(email, user)
        res.send({messages: messages})
    }catch (e) {
        res.send(e)
    }
})

router.post('/adminGetMessages',tokenAuth.adminAccessToken, async (req, res) => {
    const {email} = req.email
    const {user} = req.body
    try{
        const messages = await messagesQuery.receiveAllMessages(email, user)
        res.send({messages: messages})
    }catch (e) {
        res.send(e)
    }
})
module.exports = router