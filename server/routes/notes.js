const multer = require('multer')
const express = require('express')
const router = express.Router()
const path = require('path')
const {getPostsForUser} = require("../query/notesQuery");
const {getPostsFromAdmin} = require("../query/notesQuery");
const {publishPost} = require("../query/notesQuery");
const {authToken} = require("../authHelpers/tokenAuth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("publicfiles"))
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(/ /g, "-")
        console.log(fileName)
        cb(null, fileName)
    }
})

const upload = multer({storage: storage}).single('file')

router.post('/upload', authToken, (req, res) => {
    if (req.isAdmin) {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).send(err)
            } else if (err) {
                return res.status(500).send(err)
            } else {
                const {title, note, targetClient} = req.body
                const fileName = req.file.originalname.replace(/ /g, "-")
                const filePath = path.join(path.resolve("publicfiles"), fileName)
                publishPost(req.email, targetClient, title, note, filePath).then(response => res.send(req.file))
                    .catch(err => res.status(500).send({msgs: "error happened"}))
            }
        })
    } else {
        res.status(403).send({msgs: "Access Denied"})
    }
})

router.get('/admin', authToken, async (req, res) => {
    if (req.isAdmin) {
        try {
            const posts = await getPostsFromAdmin(req.email)
            res.send({posts: posts})
        } catch (e) {
            res.send({msgs: "couldn't fetch posts"})
        }
    }
    res.status(403).send({msgs: "Access Denied"})
})

router.get('/user', authToken, async (req, res) => {
    try {
        const posts = await getPostsForUser(req.email)
        res.send({posts: posts})
    } catch (e) {
        res.send({msgs: "couldn't fetch posts"})

    }
})
module.exports = router