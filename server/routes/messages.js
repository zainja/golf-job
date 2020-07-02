const express = require('express')
const router = express.Router()
const messagesQuery = require('../query/messagesQuery')
router.post('/sendMessage', async (req, res) => {
    const {subject, sender, receiver, message} = req.body
    try{
        await message(subject, sender, receiver, message)
        res.send({msgs: "message sent"})
    }catch (e) {
        res.send(e)
    }
})
module.exports = router