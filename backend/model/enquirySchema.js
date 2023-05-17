const mongoose = require('mongoose');
const schema = mongoose.Schema;
const enquiryData = new schema({
    senderId: { type: String },
    senderName: { type: String },
    phoneNumber: { type: Number },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    receiverId: { type: String },
    receiverName: { type: String },
    propertyId: { type: String },
    propsId: { type: String },
    propertyImage: { type: String },
    message: [
        {
            senderId: { type: String },
            role: { type: String },
            message: { type: String },
            document: { type: [String] },
            time: { type: String }
        }
    ],
    messages: [
        {
            chatDate: { type: String },
            message: [
                {
                    senderId: { type: String },
                    role: { type: String },
                    message: { type: String },
                    document: { type: [String] },
                    time: { type: String }
                }
            ]
        }
    ]
}, {
    versionKey: false
})
const enquiryDatas = mongoose.model('Enquiry Data', enquiryData);

module.exports = enquiryDatas;