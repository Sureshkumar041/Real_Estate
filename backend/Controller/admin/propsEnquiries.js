const { default: jwtDecode } = require('jwt-decode')
const enquiryDatas = require('../../model/enquirySchema');

const PropsEnquiries = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token);

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info,
                role: decode.role
            }
            res.status(sts).json(data)
        }

        if (decode.role === 'Admin') {
            const propsId = req.query.propsId;
            await enquiryDatas.aggregate([{ $match: { propsId: propsId } }])
                .then(res => sendResponse(200, 'Success', res))
                .catch(err => sendResponse(420, 'Failed', err.message))
            // Method Failure 420

        } else {
            // Unauthorized 401
            const propsId = req.query.propsId;
            await enquiryDatas.aggregate([{ $match: { propsId: propsId } }])
                .then(res => sendResponse(200, 'Success', res))
                .catch(err => sendResponse(420, 'Failed', err.message))
        }
    } catch (err) {
        console.log('Err props enquiries: ', err.message);
        const data = {
            status: 500,
            message: 'Failed',
            data: err.message
        }
        res.status(500).json(data)
    }
}

module.exports = PropsEnquiries;