const buyerSchema = require('../../model/buyerSchema')
const sellerSchema = require('../../model/sellerSchema')
const enquirySchema = require('../../model/enquirySchema')
const postPropertySchema = require('../../model/postproperty')
const { default: jwtDecode } = require('jwt-decode')

const Notifications = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token);
        const role = decode.role,
            id = decode.id;
        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            res.status(sts).json({ data: data })
        }

        const userAdmin = async () => {
            const sellerCount = await sellerSchema.find().count();
            const buyerCount = await buyerSchema.find().count();
            const propertyCount = await postPropertySchema.find().count();
            const enquiryCount = await enquirySchema.find().count();
            const data = {
                sellerCount,
                buyerCount,
                propertyCount,
                enquiryCount,
                role: 'Admin'
            }
            sendResponse(200, 'Success', data)
        }

        const userSeller = async () => {
            const propertyCount = await postPropertySchema.find({ sellerId: id }).count();
            // const vaiable = userSchema.find().count()
            const enquiryCount = await enquirySchema.find({ receiverId: id }).count()
            const data = {
                propertyCount,
                enquiryCount,
                role: 'Seller'
            }
            sendResponse(200, 'Success', data)
        }
        if (role === 'Admin') {
            console.log("Admin");
            userAdmin()
        } else {
            console.log("Seller");
            userSeller()
        }
    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
    }
}

module.exports = Notifications;


// var userFolderName = []
// var value = true

// dbObj.forEach(element => {

//     if (userFolderName.length === 0) {
//         value = true
//     } else {
//         userFolderName.forEach(name => {
//             if (element.folderName === name) {
//                 value = false
//             }
//         });
//     }

//     if (value) {
//         userFolderName.push(element.folderName)
//     }

// });