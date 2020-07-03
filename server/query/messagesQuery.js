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
                if (err) reject(err)
                resolve(result)
            })
    })
}

module.exports.getAllPeopleUserTalkedTo = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT users.email, users.first_name, users.last_name FROM conversations
                                LEFT JOIN users
                                ON users.email = conversations.sender
                                WHERE receiver = ?
                                UNION
                                SELECT users.email, users.first_name, users.last_name FROM conversations
                                LEFT JOIN users
                                ON users.email = conversations.receiver
                                WHERE sender = ?`,[user, user],(err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports.getLatestMessage = (user, otherUser) => {
 return new Promise((resolve, reject) => {
     connection.query(`SELECT message,time, sender 
                            FROM conversations 
                            WHERE (sender = ? AND receiver = ? ) 
                            OR (receiver = ? AND sender='jaffalzainalden@gmail.com') 
                            ORDER BY time DESC LIMIT 1`)
 },[user, otherUser, user, otherUser],(err, result) => {
     if (err) reject(err)
     resolve(result)
 })
}