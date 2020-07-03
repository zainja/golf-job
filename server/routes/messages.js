const express = require('express')
const router = express.Router()
const messagesQuery = require('../query/messagesQuery')
const tokenAuth = require('../authHelpers/tokenAuth')
const {getLatestMessage} = require("../query/messagesQuery");
const {getAllPeopleUserTalkedTo} = require("../query/messagesQuery");
router.post('/sendMessage',tokenAuth.authToken, async (req, res) => {
    const email = req.email
    const {receiver, message} = req.body
    try{
        await messagesQuery.sendMessage(email, receiver, message)
        res.send({msgs: "message send"})
    }catch (e) {
        res.send(e)
    }
})


router.post('/getMessages',tokenAuth.authToken, async (req, res) => {
    const email = req.email
    const {user} = req.body
    try{
        const messages = await messagesQuery.receiveAllMessages(email, user)
        res.send({messages: messages})
    }catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.get('/allUsersTalkedTo', tokenAuth.authToken, async (req, res) => {
    const email = req.email
    try{
        const users = await getAllPeopleUserTalkedTo(email)
        res.send({users: users})
    }catch (e) {
        res.send(e)
    }
})

router.get('/lastMessage', tokenAuth.authToken, async (req, res) => {
    const email = req.email
    const otherUser = req.body.otherUser
    try {
        const message = await getLatestMessage(email, otherUser)
        res.send({
            message: message, isUser: message[0].sender === email
        })
    }catch (e) {

    }
})
module.exports = router