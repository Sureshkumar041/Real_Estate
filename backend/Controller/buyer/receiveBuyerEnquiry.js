const buyerEnquiry = require('../../model/buyerEnquiry');

const ReceiveBuyerEnquiry = async (req, res, next) => {
    const sellerId = req.params.id;
    console.log("SellerId seller: ", sellerId);
    const filter = {
        sellerId: sellerId
    }
    const receivedEnquiry = await buyerEnquiry.find({ sellerId: sellerId });
    console.log("Received enquiry : ", receivedEnquiry);
    const data = {
        message: 'Success',
        data: receivedEnquiry
    }
    res.status(200).json({ data: data })
}

module.exports = ReceiveBuyerEnquiry;