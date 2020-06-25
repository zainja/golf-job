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

module.exports.checkAccount = (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email_verified FROM users WHERE email = ?", [email],(err, result) =>{
            if (err) reject(err)
            if (result.length === 0){
                resolve(-1)
            }else if (result[0].email_verified === true){
                resolve(1)
            }else(
                resolve(0)
            )
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