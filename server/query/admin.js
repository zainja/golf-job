const connection = require('../connection')

module.exports.enterUser = (username) => {
    new Promise( (resolve, reject) => {
        connection.query(`SELECT username, role FROM admin WHERE username = ?`, [username],
            (err, result) => {
                if (err) reject(err)
                if (result.length === 0) reject({msgs: "user not found"})
                resolve(result)
            })
    } )
}

module.exports.login = (username, password) => {
    new Promise((resolve, reject) => {
        connection.query(`SELECT password FROM admin WHERE username = ?`,[username],
            (err, result) => {
                if (err) reject(err)
                if (result[0].password === password) resolve({msgs: "user logged in"})
            })
    })
}
module.exports.register = (username, role) => {
    new Promise((resolve, reject) => {
        connection.query(`INSERT INTO admin (username, role) VALUES ( ?, ?)`, [username, role],
            (err, result) => {
                if (err) reject(err)
                resolve({msgs: "user created"})
            })
    })
}

module.exports.resetPassword = (username, password) => {
    new Promise((resolve, reject) => {
        connection.query(`UPDATE admin SET password = ? WHERE username = ?`,[password, username],
            (err, result) => {
                if (err) reject({msgs: "password didn't update"})
                resolve(result)
            })
    })
}