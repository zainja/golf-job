require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports.authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports.generateAccessToken = (email) => {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

module.exports.generateRefreshToken = (email) => {
    return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '10days'})
}