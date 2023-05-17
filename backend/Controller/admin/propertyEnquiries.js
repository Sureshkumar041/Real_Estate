const buyerEnquiry = require('../../model/buyerEnquiry');

const propertyEnquiries = async (req, res, next) => {
    try {
        const enquiries = await buyerEnquiry.find()
            .then(resp => {
                const data = {
                    message: 'Success',
                    data: resp
                }
                res.status(200).json({ data: data })
            })
            .catch(err => {
                throw new Error(err)
            })
    } catch (err) {
        const data = {
            message: 'Failed',
            data: err.message
        }
        res.status(400).json({ data: data })
    }
}

module.exports = propertyEnquiries;