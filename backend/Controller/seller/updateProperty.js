const propertySchema = require('../../model/postproperty')
// const jwt = require('jsonwebtoken')
const connect = require('../../config/database')
const fs = require('fs')

const updateProperty = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const imgpath = url + "/public/" + req.files;
        const files = req.files;
        var removeImage = [], filePath;

        const update = {
            state: req.body.state,
            address: req.body.address,
            rate: req.body.rate,
            city: req.body.city,
            type: req.body.type,
            propertyFor: req.body.propertyFor,
            sqft: req.body.sqft,
            info: req.body.info,
            pincode: req.body.pincode,
        }

        const filter = { _id: req.params.id };
        const updateDocument = {
            $set: update
        };

        const binImage = () => {
            for (const key in removeImage) {
                filePath.image.forEach(element => {
                    if (removeImage[key] === element) {
                        const path = element.split('/');
                        fs.unlink(`/home/ctl/Suresh/Visual Code/Real-Estate/backend/uploads/${path[4]}`, err => {
                            if (err) console.log("Del err: ", err.message);
                            else console.log("Del Doneeee...");
                        })
                    }
                });
            }
        }

        const delImage = async () => {
            filePath = await propertySchema.findOne(filter);
            const img = req.body.image
            if (Array.isArray(img)) {
                console.log('Start');
                for (let index = 0; index < filePath.image.length; index++) {
                    var count = [];
                    for (let i = 0; i < img.length; i++) {
                        if (filePath.image[index] !== img[i]) {
                            count.push(img[i])
                        }
                    }
                    if (count.length === img.length) {
                        removeImage.push(filePath.image[index])
                    }
                }
            } else {
                removeImage = []
                for (let index = 0; index < filePath.image.length; index++) {
                    var count = [];
                    if (filePath.image[index] !== img) {
                        count.push(img)
                    }
                    if (count.length === [img].length) {
                        removeImage.push(filePath.image[index])
                    }
                }
            }
            saveProps()
        }

        // Save Property
        const saveProps = async () => {
            if (removeImage.length !== 0) {
                binImage()
            }
            const result = await propertySchema.findByIdAndUpdate(filter, updateDocument)
                .then(response => {
                    const data = {
                        message: 'Success',
                        data: 'Property updated successfully'
                    }
                    return res.status(200).json({ data: data })
                    next()
                })
                .catch(err => {
                    console.log("Error: ", err)
                })
        }

        if (files.length !== 0 || req.body.image) {
            imageArray = req.files;
            if (req.body.image && req.files.length !== 0) {
                let image = []
                imageArray.forEach(element => {
                    image.push(url + "/uploads/" + element.filename);
                });
                if (Array.isArray(req.body.image)) {
                    update.image = [...image, ...req.body.image]
                } else {
                    update.image = [...image, req.body.image]
                }
                delImage()
            } else {
                if (req.files.length !== 0) {
                    let image = [];
                    imageArray.forEach(element => {
                        image.push(url + "/uploads/" + element.filename);
                    });
                    update.image = image
                    saveProps()
                } else {
                    if (req.body.image.length !== 0) {
                        update.image = req.body.image
                        delImage()
                    }
                }
            }
        } else {
            const data = {
                message: 'Failed',
                data: 'Image field cannot be empty'
            }
            return res.status(400).json({ data: data })
        }

    } catch (err) {
        console.log("edit property : ", err.message);
        return res.status(400).json({ data: err.message })
    }
}

module.exports = updateProperty;