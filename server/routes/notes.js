const multer = require('multer')
const express = require('express')
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

router.post('/upload', (req, res) =>{
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError){
            return res.status(500).send(err)
        }else if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).send(req, file)
    })
})