const { default: jwtDecode } = require('jwt-decode');
const enquiryDatas = require('../../model/enquirySchema')

const IndividualPropertyEnquiry = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token)
        if (decode.role === 'Admin') {
            const individualPropsEnquiry = await enquiryDatas.find()
            const data = {
                status: 200,
                message: 'Success',
                data: individualPropsEnquiry
            }
            res.status(200).json(data)
        } else {
            throw new Error('You cannot access this page')
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

module.exports = IndividualPropertyEnquiry;