const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    let {email, firstName, lastName, password} = req.body
    try{
        const hashedPassword = await hashPassword(password, 10)

    }catch (e) {
        res.send({"error": e})
    }
})


const hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
}