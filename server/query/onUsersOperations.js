const connection = require('../connection')

module.exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email_verified = TRUE AND isAdmin = FALSE`,[],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}
module.exports.getAllAdmin = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE isAdmin = TRUE AND email_verified = TRUE`,[],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}
module.exports.getUserByFirstName = (firstName) => {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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