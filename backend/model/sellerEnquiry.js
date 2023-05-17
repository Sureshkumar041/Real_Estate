const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Enquiry = new schema({
    sellerId: { type: String },
    productId: { type: String },
    buyerId: { type: String },
    userName: { type: String },
    message: { type: String }
}, {
    versionKey: false,
    timestamps: true
})

const sellerReply = mongoose.model('Buyer enquiry', buyerEnquiry);
module.exports = sellerReply;