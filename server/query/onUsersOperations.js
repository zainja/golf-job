const connection = require('../connection')

module.exports.getAllUsers = () => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email_verified = TRUE`,[],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

module.exports.getUserByFirstName = (firstName) => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email_verified = TRUE AND first_name = ?`,[firstName],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
        })
    })
}

module.exports.getUserByLastName = (lastName) => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email_verified = TRUE AND last_name = ?`,[lastName],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
        })
    })
}