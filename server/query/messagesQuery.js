const connection = require('../connection')

module.exports.sendMessage = (sender, receiver, message) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO conversations (sender, receiver, message) VALUES (?, ?, ?)",
            [sender, receiver, message],(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

module.exports.receiveAllMessages = (user, trainer) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM conversations
                                WHERE sender = ? AND receiver = ? 
                                OR sender = ? AND receiver = ?`,[user, trainer, trainer, user]
        ,(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}