const connection = require('../connection')

module.exports.sendMessage = (subject, sender, receiver, message) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO conversations (sender, receiver, message) VALUES (?, ?, ?)")
    })
}