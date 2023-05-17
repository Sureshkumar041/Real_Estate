const buyerEnquiry = require('../../model/buyerEnquiry');

const buyerRequest = async (req, res, next) => {
    try {
        console.log("Buyer request: ", req.body)
        const request = new buyerEnquiry(req.body)
        await request.save()
            .then(resp => {
                console.log("resp: ", resp);
                const data = {
                    message: 'Success',
                    data: 'Enquiry sent successfully'
                }
                res.status(200).json({ data: data })
            })
    } catch (err) {
        // const data = {
        //     message: 'Failed',
        //     data: err.message
        // }
        // res.status(400).json({ data: data })
        console.log("Error: ", err.message);
    }
    next();
}

module.exports = buyerRequest;