const bcrypt = require('bcrypt')

module.exports.hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

module.exports.comparePasswords = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}