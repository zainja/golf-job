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

module.exports.login = (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email, password, email_verified FROM users WHERE email=? AND isAdmin=FALSE",
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

module.exports.loginAdmin = (email) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email, password, email_verified FROM users WHERE email=? AND isAdmin=TRUE",
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