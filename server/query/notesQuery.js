const connection = require('../connection')


module.exports.publishPost = (trainer, client, title, body, videoPath) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO notes
                              (trainer, client, title, body, video_path)
                          VALUES (?, ?, ?, ?, ?)`,
            [trainer, client, title, body, videoPath], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}


module.exports.editPost = (title, body, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE notes
                          SET title = ? AND body = ?
                          WHERE id = ?`, [title, body, id], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })

}


module.exports.getPostsForUser = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM notes WHERE client = ?`, [user], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}


module.exports.getPostsFromAdmin = (trainer) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM notes WHERE trainer = ?`, [trainer], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}