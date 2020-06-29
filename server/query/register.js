const connection = require('../connection')

module.exports.register = (email, firstName, lastName, password, phoneNumber) => {
    return new Promise((resolve, reject) => {
         connection.query(`INSERT INTO users 
                    (email, first_name ,last_name ,password, phone_number) VALUES (?, ?, ?, ?, ?)`,
             [email, firstName, lastName, password, phoneNumber],(err, result) => {
                if (err) reject(err)
                resolve(result)
             })
    })
}

module.exports.validateEmail = (email) => {
    return new Promise(((resolve, reject) => {
        connection.query("UPDATE users SET email_verified=TRUE WHERE email = ?",
            [email],(err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    }))
}