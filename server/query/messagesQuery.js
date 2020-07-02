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
                                WHERE (sender = ? AND receiver = ?) 
                                OR (receiver = ? AND sender = ?)`,[user, trainer, user, trainer]
        ,(err, result) => {
            console.log(result)
                if (err) reject(err)
                resolve(result)
            })
    })
}