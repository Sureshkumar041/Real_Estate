const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema');
const { default: jwtDecode } = require('jwt-decode');
const fs = require('fs')

const EditProfile = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token);
        var update;
        const { userName, email, phoneNumber, address, city, state } = await req.body;

        const filter = {
            _id: decode.id
        }

        if (req.file && req.file) {
            const img = req.file;
            update = {
                $set: {
                    profileImage: img.filename
                }
            }
        } else {
            update = {
                $set: {
                    userName: userName,
                    email: email,
                    phoneNumber: phoneNumber
                }
            }
        }

        const addData = {
            $set: {
                address: address,
                city: city,
                state: state
            }
        }


        // Checking if  username and email already exists or not ...!
        const buyerUserName = await buyerSchema.findOne({ userName: userName })
        const buyerEmail = await buyerSchema.findOne({ email: email })
        const sellerUserName = await sellerSchema.findOne({ userName: userName })
        const sellerEmail = await sellerSchema.findOne({ email: email })

        // console.log("Buyer user: ", buyerUserName);
        // console.log('Buer email: ', buyerEmail);
        // console.log('Seller User: ', sellerUserName);
        // console.log('Seller Email: ', sellerEmail);

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            res.status(sts).json({ data: data })
        }

        const saveChange = async () => {
            if (decode.role === 'Buyer') {
                const editData = await buyerSchema.findByIdAndUpdate(filter, update)
                await buyerSchema.updateOne({ _id: decode.id }, addData)
                sendResponse(200, 'Success', 'Edit Successfully')
            } else {
                const editData = await sellerSchema.findByIdAndUpdate(filter, update)
                await sellerSchema.updateOne({ _id: decode.id }, addData)
                sendResponse(200, 'Success', 'Edit Successfully')
            }
        }

        const delProfileImage = img => {           
            fs.unlink(`/home/ctl/Suresh/Visual Code/Real-Estate/backend/profileImages/${img}`, err => {
                if (err) console.log("Del err: ", err.message);
                else console.log("Del Doneeee...");
            })
            return true;
        }

        if (decode.role === 'Buyer') {
            if (req.file) {
                const userData = await buyerSchema.findOne({ _id: decode.id })
                if (userData.profileImage) delProfileImage(userData.profileImage)
                saveChange()
            } else {
                if (buyerUserName && buyerEmail) {
                    if (decode.id === buyerUserName._id.toString() && decode.id === buyerEmail._id.toString()) {
                        if (sellerUserName || sellerEmail) {
                            sendResponse(400, 'Failed', 'User name or Email already exists')
                        } else {
                            saveChange()
                        }
                    } else {
                        sendResponse(400, 'Failed', 'User name or Email already exists')
                    }
                } else {
                    if (sellerUserName || sellerEmail) {
                        sendResponse(400, 'Failed', 'User name or Email already exists')
                    } else {
                        saveChange()
                    }
                }
            }

        } else if (decode.role === 'Seller' || decode.role === 'Admin') {
            if (req.file) {
                const userData = await sellerSchema.findOne({ _id: decode.id })
                if (userData.profileImage) delProfileImage(userData.profileImage)
                saveChange()
            } else {
                if (sellerUserName && sellerEmail) {
                    if (decode.id === sellerUserName._id.toString() && decode.id === sellerEmail._id.toString()) {
                        if (buyerUserName || buyerEmail) {
                            sendResponse(400, 'Failed', 'User name or Email already exists')
                        } else {
                            saveChange()
                        }
                    } else {
                        sendResponse(400, 'Failed', 'User name or Email already exits')
                    }
                } else {
                    if (buyerUserName || buyerEmail) {
                        sendResponse(400, 'Failed', 'User name or Email already exists')
                    } else {
                        saveChange()
                    }
                }
            }

        } else {
            sendResponse(400, 'Failed', 'User name or Email already exits')
        }
    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        res.status(400).json({ data: data })
    }
}

module.exports = EditProfile;