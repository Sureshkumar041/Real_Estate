const { decode } = require('jsonwebtoken');
const enquiryDatas = require('../../model/enquirySchema')
const jwt_decode = require('jwt-decode')
const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema')

const receiveEnquiry = async (req, res, next) => {
    try {
        const token = req.token;
        const decode = jwt_decode(token),
            senderId = req.query.senderId;
        var userData, enquiryData;

        if (senderId) {
            // Get enquiry data =>  person
            if (decode.role === 'Buyer') {
                await sellerSchema.findOne({ _id: senderId })
                    .then(resp => {
                        userData = resp;
                    })
                    .catch(err => {
                        console.log('User Err: ', err.message);
                    })
                enquiryData = await enquiryDatas.aggregate([{ $match: { senderId: decode.id, receiverId: senderId } }])
            } else {
                await buyerSchema.findOne({ _id: senderId })
                    .then(resp => {
                        userData = resp;
                    })
                    .catch(err => {
                        console.log('User Err: ', err.messag);
                    })
                enquiryData = await enquiryDatas.aggregate([{ $match: { senderId: senderId, receiverId: decode.id } }])
            }
            const data = {
                status: 200,
                message: 'Success',
                role: decode.role,
                data: enquiryData,
                userData: userData
            }
            res.status(200).json(data)
        } else {
            // Get Seller Enquiry
            const enquiryData = await enquiryDatas.find({ $or: [{ senderId: decode.id }, { receiverId: decode.id }] })
            const data = {
                status: 200,
                message: 'Success',
                role: decode.role,
                data: enquiryData
            }
            res.status(200).json(data)
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

module.exports = receiveEnquiry;