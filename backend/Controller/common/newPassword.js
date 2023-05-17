const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema');
const { ObjectId } = require('mongodb');
const crypto = require('crypto-js');

const NewPassword = async (req, res, next) => {
    const userId = req.query.userId;
    const newPassword = req.query.newpswd,
        confirmPassword = req.query.cnfmpswd;
    const validPswd = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    const sellerData = await sellerSchema.aggregate([{ $match: { _id: new ObjectId(userId) } }])
    const buyerData = await buyerSchema.aggregate([{ $match: { _id: new ObjectId(userId) } }])
    const userData = sellerData.length != 0 ? (sellerData) : buyerData.length != 0 ? buyerData : null
    const filter = { _id: userData[0]._id }

    const sendResponse = (sts, msg, info) => {
        const data = {
            status: sts,
            message: msg,
            data: info
        }
        return res.status(sts).json(data)
    }

    const removeOtp = async () => {
        if (userData[0].role === 'Buyer') {
            await buyerSchema.updateOne({ filter }, { $unset: { otp: '', expireOtpTime: '' } })
                .then(resp => sendResponse(200, 'Success', 'Password Updated Successfully'))
                .catch(err => console.log('Err new: ', err.message))
        } else {
            await sellerSchema.updateOne({ filter }, { $unset: { otp: '', expireOtpTime: '' } })
                .then(resp => sendResponse(200, 'Success', 'Password Updated Successfully'))
                .catch(err => console.log('Err new: ', err.message))
        }
    }

    if (userData && userData.length !== 0) {
        if (validPswd.test(newPassword)) {
            if (newPassword === confirmPassword) {
                var encrypt = crypto.AES.encrypt(newPassword, 'abcdefg').toString();
                const update = { $set: { password: encrypt } }
                if (userData[0].role === 'Buyer') {
                    await buyerSchema.findByIdAndUpdate(filter, update)
                        .then(resp => removeOtp())
                        .catch(err => console.log('Err new: ', err.message))
                } else {
                    await sellerSchema.findByIdAndUpdate(filter, update)
                        .then(resp => removeOtp())
                        .catch(err => console.log('Err new: ', err.message))
                }
            } else {
                sendResponse(417, 'Failed', 'Password must be same')
            }
        } else {
            sendResponse(417, 'Failed', 'Password must be strong')
        }
    }
}

module.exports = NewPassword;