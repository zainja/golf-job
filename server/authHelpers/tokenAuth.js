require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports.authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, emailObj) => {
        if (err) return res.sendStatus(403)
        req.email = emailObj
        next()
    })
}

module.exports.registerTokenAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({msgs: "Confirmation email expired"})
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, emailObj) => {
        if (err) return res.status(403).send({msgs: "Confirmation email expired"})
        req.email = emailObj
        next()
    })
}

module.exports.resetPasswordTokenAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({msgs: "reset password link expired"})
    jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET, (err, emailObj) => {
        if (err) return res.status(403).send({msgs: "reset password link expired"})
        req.email = emailObj
        next()
    })
}