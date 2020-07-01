const connection = require('../connection')

module.exports.enterUser = (username) => {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM admin WHERE username = ?`, [username],(err, result) => {
            if (err) reject(err)
            if (result.length === 0) reject({msgs: "user not found"})
            resolve(result[0])
        })
    })
}


module.exports.register = (username, firstName, lastName, role) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO admin (username, first_name, last_name, role) VALUES ( ?, ?, ?, ?)`,
            [username, role],
            (err, result) => {
                if (err) reject(err)
                resolve({msgs: "user created"})
            })
    })
}

module.exports.resetPassword = (username, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE admin SET password = ? WHERE username = ?`,[password, username],
            (err, result) => {
                if (err) reject({msgs: "password didn't update"})
                resolve(result)
            })
    })
}