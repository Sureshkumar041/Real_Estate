const dateTime = require('./dateTime')
const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema')

const VerifyOtp = async (req, res, next) => {
    try {
        console.log('Suresh');
        const email = req.query.userId,
            otp = req.query.otp,
            currentDate = dateTime().currentDate.split('/'),
            currentTime = dateTime().currentTime.split(':'),
            hours = currentTime[0],
            minutes = parseInt(currentTime[1].split(' ')[0])


        const sellerData = await sellerSchema.findOne({ _id: email })
        const buyerData = await buyerSchema.findOne({ _id: email })
        const userData = sellerData || buyerData

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            return res.status(sts).json(data)
        }

        if (userData && userData) {
            const expires = userData.expireOtpTime.expireDate.split('/')
            const expireTime = userData.expireOtpTime.expireTime.split(':')
            // (YYYY, MM, DD, Hr, Min, Sec)
            let expireDbTime = new Date(expires[2], expires[1], expires[0], expireTime[0], expireTime[1].split(' ')[0]);
            let nowDbTime = new Date(currentDate[2], currentDate[1], currentDate[0], hours, minutes, 00);

            if (expireDbTime.getTime() >= nowDbTime.getTime()) {
                if (userData.otp === parseInt(otp)) {
                    sendResponse(200, 'Success', 'Valid')
                }
                else {
                    sendResponse(404, 'Failed', 'Invalid Otp')
                }
            } else {
                // Gateway Timeout
                sendResponse(504, 'Failed', 'Otp expired')
            }
        }

    } catch (err) {
        const data = {
            status: 500,
            message: 'Failed',
            data: err.message
        }
        return res.status(500).json(data)
    }
}

module.exports = VerifyOtp;