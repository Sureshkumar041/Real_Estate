const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema');
const { default: jwtDecode } = require('jwt-decode');

const AddDetails = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token);

        const filter = {
            _id: decode.id
        }
        const addData = {
            $set: {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state
            }
        }

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            res.status(sts).json(data)
        }

        if (decode.role === 'Buyer') {
            console.log('Buyer');
            await buyerSchema.updateOne({ _id: decode.id }, addData)
                .then(res => sendResponse(200, 'Success', 'Add successfully'))
                .catch(err => { throw err })
        } else {
            console.log('Seller');
            await sellerSchema.updateOne({ _id: decode.id }, addData)
                .then(res => sendResponse(200, 'Success', 'Add successfully'))
                .catch(err => { throw err })
        }
    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
    }
}

module.exports = AddDetails;