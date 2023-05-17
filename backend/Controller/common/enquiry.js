const jwt_decode = require('jwt-decode')
const enquiryDatas = require('../../model/enquirySchema');


const enquiryData = async (req, res, next) => {
    try {
        const token = req.token;
        const decode = jwt_decode(token);
        const { address, city, receiverId, receiverName, propertyId, message, propsId, propertyImage } = req.body;
        var info, datas;

        const msg = {
            senderId: decode.id,
            senderName: decode.userName,
            phoneNumber: decode.phoneNumber,
            email: decode.email,
            address: address,
            city: city,
            receiverId: receiverId,
            receiverName: receiverName,
            propertyId: propertyId,
            propsId: propsId,
            propertyImage: propertyImage,
            message: [],
            messages: []
        }

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes()
        var newformat = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var dat = date.getDate()
        const months = date.getMonth()
        const year = date.getFullYear()
        dat = dat < 10 ? '0' + dat : dat;
        var currentDate = dat + '/' + (months + 1) + '/' + year;

        if (req.files && req.files.length !== 0) {
            const docArray = req.files;
            const document = [];
            docArray.forEach(element => {
                document.push(element.originalname)
            });
            info = {
                senderId: decode.id,
                role: decode.role,
                document: document,
                time: hours + ':' + minutes + ' ' + newformat
            }
        } else {
            info = {
                senderId: decode.id,
                role: decode.role,
                message: message,
                time: hours + ':' + minutes + ' ' + newformat

            }
            msg.message.push(info)
        }

        const oldConversation = await enquiryDatas.findOne({ $and: [{ senderId: decode.id }, { receiverId: receiverId }] }) ||
            await enquiryDatas.findOne({ $and: [{ senderId: receiverId }, { receiverId: decode.id }] })

        if (oldConversation) {
            // const add = {
            //     senderId: decode.id,
            //     role: decode.role,
            //     message: info
            // }
            const data = {
                status: 200,
                message: 'Success',
                data: 'Message sent'
            }
            const lastData = oldConversation.messages[oldConversation.messages.length - 1];
            if (currentDate === lastData.chatDate) {
                console.log('Push id: ', oldConversation.messages[0]._id);
                const addEnquiry = await enquiryDatas.findByIdAndUpdate(
                    { _id: oldConversation._id },
                    {
                        $push:
                        {
                            "messages.$[i].message": info
                        }
                    },
                    {
                        arrayFilters: [
                            { 'i._id': lastData._id }
                        ]
                    }
                )
            } else {
                console.log('Create')
                datas = {
                    chatDate: currentDate,
                    message: [
                        info
                    ]
                }
                const addEnquiry = await enquiryDatas.findByIdAndUpdate({ _id: oldConversation._id }, { $push: { messages: datas } })
            }
            const addEnquiry = await enquiryDatas.findByIdAndUpdate({ _id: oldConversation._id }, { $push: { message: info } })
            res.status(200).json(data)
        } else {
            if (address && city) {
                var msgStore = new enquiryDatas(msg);
                datas = {
                    chatDate: currentDate,
                    message: [
                        info
                    ]
                }
                msgStore.messages.push(datas)
                msgStore.save(err => {
                    if (err) {
                        console.log("Err", err.message);
                        throw new Error(err);
                    } else {
                        const data = {
                            status: 200,
                            message: 'Success',
                            data: 'Message sent'
                        };
                        res.status(200).json(data);
                    }
                })
            } else {
                const data = {
                    status: 400,
                    message: 'Failed',
                    data: 'Add your details'
                }
                res.status(401).json(data)
            }
        }
    } catch (err) {
        console.log("Error: ", err.message);
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        res.status(400).json(data)
    }
}

module.exports = enquiryData;