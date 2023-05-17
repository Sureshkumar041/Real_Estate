const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema');
const { default: jwtDecode } = require('jwt-decode');

const GetUserData = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token),
            userId = req.query.userId;

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            res.status(sts).json(data)
        }

        if (userId) {
            const userData = await sellerSchema.findOne({ _id: userId }) ||
                await buyerSchema.findOne({ _id: userId })
            sendResponse(200, 'Success', userData)
        } else {
            if (decode.role === 'Buyer') {
                const userData = await buyerSchema.findOne({ _id: decode.id })
                sendResponse(200, 'Success', userData)
            } else {
                const userData = await sellerSchema.findOne({ _id: decode.id })
                sendResponse(200, 'Success', userData)
            }
        }
    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        res.status(400).json(data)
    }
}

module.exports = GetUserData;