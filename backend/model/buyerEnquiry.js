const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Enquiry = new schema({
    buyerId: { type: String },
    buyerName: { type: String },
    message: { type: String },
    sellerId: { type: String },
    productId: { type: String }
}, {
    versionKey: false,
    timestamps: true
})

const buyerEnquiry = mongoose.model('Buyer enquiry', Enquiry);
module.exports = buyerEnquiry;