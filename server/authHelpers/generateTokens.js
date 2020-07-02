const jwt = require('jsonwebtoken')

module.exports.generateAccessToken = (email) => {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

module.exports.generateRefreshToken = (email) => {
    return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '10 days'})
}

module.exports.generateRegisterToken = (email) => {
    return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2 days'})
}

module.exports.generateResetPasswordToken = (email) => {
    return jwt.sign(email, process.env.RESET_PASSWORD_TOKEN_SECRET, {expiresIn: '1h'})
}

module.exports.generateAdminAccessToken = (email) => {
    return jwt.sign({email: email}, process.env.ADMIN_TOKEN_SECRET)
}