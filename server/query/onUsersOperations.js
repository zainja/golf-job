const connection = require('../connection')

module.exports.getAllUsers = () => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email_verified = TRUE AND isAdmin = FALSE`,[],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}
module.exports.getAllAdmin = () => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE isAdmin = TRUE AND email_verified = TRUE`)
    })
}
module.exports.getUserByFirstName = (firstName) => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users
                                WHERE email_verified = TRUE 
                                AND first_name = ?
                                AND isAdmin = FALSE`,[firstName],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
        })
    })
}

module.exports.getUserByLastName = (lastName) => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users 
                                WHERE email_verified = TRUE 
                                AND last_name = ?
                                AND isAdmin = FALSE`,[lastName],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
        })
    })
}