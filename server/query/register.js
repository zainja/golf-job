const connection = require('../connection')

module.exports.register = (email, firstName, lastName, password, phoneNumber) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT email FROM users WHERE email = ?", [email],(err, result) => {
            if (err) reject(err)
            if (result.length === 0){
                connection.query(`INSERT INTO users 
                    (email, first_name ,last_name ,password, phone_number) VALUES (?, ?, ?, ?, ?)`,
                    [email, firstName, lastName, password, phoneNumber],(err, result) => {
                        if (err) reject(err)
                        resolve(result)
                    })
            }else reject({message: "email is already used"})
        })
    })
}