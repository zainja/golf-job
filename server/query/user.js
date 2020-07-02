const connection = require('../connection')
/**
 * user and admin login register, email verification, password reset operations
 */
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

module.exports.registerAsAdmin = (email, firstName, lastName, password, phoneNumber) => {
    return new Promise((resolve, reject) => {
         connection.query(`INSERT INTO users 
                    (email, first_name ,last_name ,password, phone_number, isAdmin) VALUES (?, ?, ?, ?, ?, TRUE)`,
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

module.exports.checkAccount = (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email_verified FROM users WHERE email = ?", [email],(err, result) =>{
            console.log(result[0].email_verified)
            if (err) reject(err)
            if (result.length === 0){
                resolve(-1)
            }else if (result[0].email_verified === 1){
                resolve(1)
            }else(
                resolve(0)
            )
        })
    })
}

module.exports.login = (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email, password, email_verified FROM users WHERE email=?",
            [email],(err, result) => {
            console.log(result)
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
        connection.query("UPDATE users SET password = ? WHERE email = ?", [newPassword, email],(err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    })
}