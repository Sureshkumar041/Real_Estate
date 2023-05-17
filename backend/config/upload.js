const fs = require("fs");
const multer = require("multer");

const Fileupload = (path) => {
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path)
        },
        filename: function (req, file, callback) {
            // console.log('Filesss: ', file);
            // const uploadname = file.originalname.split(".");
            // console.log('uploadname: ', uploadname);
            // const extension = "." + uploadname[uploadname.length - 1];
            // const fileuploadname = Date.now().toString();
            const fileuploadname = file.originalname;
            fs.readFile(path + file.originalname, (err, res) => {
                if (!err) {
                    callback(null, fileuploadname )
                }
                else {
                    callback(null, fileuploadname )
                }
            })
        }
    })
    const uploaded = multer({ storage: storage });
    return uploaded;
}
module.exports = {
    Fileupload: Fileupload
}
