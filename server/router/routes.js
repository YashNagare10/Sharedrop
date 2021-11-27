const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { v4: uuid4 } = require('uuid');

require('../database-configuration/connection');
const User = require('../database-configuration/schema');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 100 }
}).single('myfile');

router.post("/api/files", async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (!req.file) {
                res.json({ error: "File required" });
            }

            if (err) {
                return res.send({ error: err.message });
            }

            const user = new User({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size
            });

            const response = await user.save();
            return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });

        });
    } catch (err) {
        console.log(err);
    }
});

router.get("/files/:uuid", async (req, res) => {
    try {
        const file = await User.findOne({ uuid: req.params.uuid });

        if (!file) {
            return res.render('download', { error: "Link has been expired" });
        }

        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });

    } catch (err) {
        return res.render('download', { error: "Something went Wrong" });
    }
});

router.get("/files/download/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    const file = await User.findOne({ uuid: uuid });

    if (!file) {
        return res.render('download', { error: "Link has been expired" });
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
})

module.exports = router;