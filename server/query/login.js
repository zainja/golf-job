const connection = require('../connection')

module.exports.login = (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email, password FROM users WHERE email=?",
            [email],(err, result) => {
            if (err){
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
}

module.exports.resetPassword = (email, newPassword) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE users SET password = ? WHERE email = ?", [email, newPassword],(err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    })
}