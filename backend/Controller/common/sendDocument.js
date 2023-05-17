const { default: jwtDecode } = require("jwt-decode")
const enquiryDatas = require('../../model/enquirySchema');

const SendDocument = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token)
        console.log('Datas');
        console.log('Req data: ', req.body);
        console.log('Req data: ', req.files);
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

module.exports = SendDocument;