const { default: jwtDecode } = require('jwt-decode');
const { ObjectId } = require('mongodb');
const ModelSchema = require('../model/modelCollection/modelSchema')
const DateTime = require('../Controller/common/dateTime')
const userActivitySchema = require('../model/sendEmailSchema')

const SendEmailService = async req => {
    try {
        const decode = jwtDecode(req.token),
            city = req.query.city,
            propertyType = req.query.propertyType,
            searchDate = DateTime().currentDate

        console.log('city: ', city, ' ', propertyType, ' ', searchDate);
        const sellerData = await ModelSchema().sellerSchema.aggregate([{ $match: { _id: new ObjectId(decode.id) } }])
        const buyerData = await ModelSchema().buyerSchema.aggregate([{ $match: { _id: new ObjectId(decode.id) } }])
        var userData = sellerData.length != 0 ? (sellerData) : buyerData.length != 0 ? buyerData : null
        userData = userData[0]

        const sendResponse = (sts, msg, value) => {
            const data = {
                status: sts,
                message: msg,
                data: value
            }
            return data
        }

        const userActivity = await ModelSchema().sendEmailSchema.findOne({ userId: userData._id })
        console.log('userActivity: ', userActivity);
        if (userActivity) {
            console.log('Push');
        } else {
            console.log('Add');
            const details = {
                userId: userData._id,
                userName: userData.userName,
                email: userData.email,
                recentSearch: [
                    {
                        city: city,
                        propertyType: propertyType,
                        searchDate: searchDate
                    }
                ]
            }
            const saveActivity = new userActivitySchema(details)
            saveActivity.save(err => {
                if (err) {
                    console.log('Err');
                    return sendResponse(420, 'Failed', err.message)
                } else {
                    console.log('Saved');
                    const data = sendResponse(200, 'Success', 'Saved')
                    return data = {
                        status: 500,
                        message: 'Failed',
                        data: 'err.message'
                    }
                }
            })
        }
    } catch (err) {
        console.log('Err: ', err.message);
        const data = {
            status: 500,
            message: 'Failed',
            data: err.message
        }
        return data
    }
}

module.exports = SendEmailService;