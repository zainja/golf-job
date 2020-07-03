const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const auth = require('./routes/user')
const admin = require('./routes/admin')
const message = require('./routes/messages')
const port = 5000 | process.env.PORT
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/" , (req,res) => {
    res.send("Server Working")
})

app.use("/auth", auth )
app.use("/admin", admin)
app.use("/messages", message)
app.listen(port)