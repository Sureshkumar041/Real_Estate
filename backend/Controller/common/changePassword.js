const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema')
const { default: jwtDecode } = require('jwt-decode')
const crypto = require('crypto-js');

const ChangePassword = async (req, res, next) => {
    try {
        const email = req.body.email,
            password = req.body.password,
            newPassword = req.body.newPassword,
            cnfmPassword = req.body.cnfmPassword;
        const decode = jwtDecode(req.token)

        const filter = {
            _id: decode.id
        };

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            res.status(sts).json({ data: data })
        }

        if (decode.role === 'Buyer') {
            const validateUser = await buyerSchema.findOne({ _id: decode.id })
            var decrypt = crypto.AES.decrypt(validateUser.password, 'abcdefg').toString(crypto.enc.Utf8);
            // if (email === validateUser.email) {
            if (password === decrypt) {
                if (newPassword === cnfmPassword) {
                    var changePswd = crypto.AES.encrypt(newPassword, 'abcdefg').toString();
                    var decrypt = crypto.AES.decrypt(changePswd, 'abcdefg').toString(crypto.enc.Utf8)
                    const update = {
                        $set: {
                            password: changePswd
                        }
                    }
                    const editPassword = await buyerSchema.findByIdAndUpdate(filter, update)
                    sendResponse(200, 'Success', 'Password Changed Successfully')
                } else {
                    sendResponse(400, 'Failed', 'Password must be same')
                }

            } else {
                sendResponse(400, 'Failed', 'Invalid Password')
            }
        } else {
            const validateUser = await sellerSchema.findOne({ _id: decode.id })
            var decrypt = crypto.AES.decrypt(validateUser.password, 'abcdefg').toString(crypto.enc.Utf8);
            if (password === decrypt) {
                if (newPassword === cnfmPassword) {
                    var changePswd = crypto.AES.encrypt(newPassword, 'abcdefg').toString();
                    var decrypt = crypto.AES.decrypt(changePswd, 'abcdefg').toString(crypto.enc.Utf8)
                    const update = {
                        $set: {
                            password: changePswd
                        }
                    }
                    const editPassword = await sellerSchema.findByIdAndUpdate(filter, update)
                    sendResponse(200, 'Success', 'Password changed successfully')
                } else {
                    sendResponse(400, 'Failed', 'Password must be same')
                }
            } else {
                sendResponse(400, 'Failed', 'Invalid Password')
            }
        }
    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        return res.status(500).json(data)
    }
}

module.exports = ChangePassword;