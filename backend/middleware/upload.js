const path = require('path');
const multer = require('multer');

console.log("Middleware");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        console.log("Extension of img: ", ext);
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        console.log("Inside mw");
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            console.log("Middleware: ",file);
            console.log("Valid image format");
            callback(null, true);
        } else {
            console.log("Only png, jpg & jpeg file supported...!");
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;