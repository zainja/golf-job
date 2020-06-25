const connection = require('../connection')

module.exports.register = (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email FROM users WHERE email = ? AND password = ?", [email, password],(err, result) => {
            if (err) reject(err)
            if (result.length === 0){
                reject({message: "incorrect email or password"})
            }
            resolve(result)
        })
    })
}