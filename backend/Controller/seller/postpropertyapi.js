const { IdGenerator } = require('custom-random-id');
const propertySchema = require('../../model/postproperty');


const imageStore = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get("host");
        const imgpath = url + "/public/" + req.files;
        const state = req.body.state,
            address = req.body.address,
            rate = req.body.rate,
            city = req.body.city,
            type = req.body.type,
            propertyFor = req.body.propertyFor,
            sqft = req.body.sqft,
            imageArray = req.files,
            info = req.body.info,
            pincode = req.body.pincode,
            sellerId = req.body.sellerId,
            sellerName = req.body.sellerName
        let image = [];
        [...imageArray].forEach(element => {
            image.push(url + "/uploads/" + element.filename);
        });
        const ID = new IdGenerator("{{ number_5 }}");
        let id = ID.getFinalExpression();
        const data = {
            propsId: id,
            city,
            address,
            state,
            pincode,
            image,
            propertyFor,
            type,
            sqft,
            rate,
            info,
            sellerId,
            sellerName,
            status: 'Active'
        };
        var property = new propertySchema(data);
        property.save(err => {
            if (err) {
                throw new Error('Unable to upload your property');
            }
            else {
                const data = {
                    message: 'Success',
                    data: 'Property upload successfully'
                };
                res.status(200).json({ data: data });
                next();
            }
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
        const data = {
            message: 'Failed',
            data: err.message
        }
        res.status(400).json({ data: data })
    }






    // try {
    //     console.log("Property Api");
    //     var property = new propertySchema(req.body);

    //     // console.log("Request files: ", req.files.image);

    //     if (req) {
    //         console.log("Request file data: ",req.files);
    //         console.log("Controller");
    //         let path = '';
    //         req.files.forEach(function (files, index, array) {
    //             path = path + files.path + ',';
    //             console.log("1");
    //         });
    //         path = path.substring(0, path.lastIndexOf(","));
    //         property.image = path;  

    //         // Save in the database...!
    //         property.save()
    //             .then(response => {
    //                 console.log("Doneee...!");
    //                 return res.json({
    //                     message: 'Image stored successfully'
    //                 })
    //             })
    //     } else {
    //         console.log("Image store control not...!");
    //     }


    // } catch (error) {
    //     console.log("Error");module.expo
    //     return res.json({
    //         message: 'Image not stored'
    //     })
    // }

}

module.exports = imageStore;