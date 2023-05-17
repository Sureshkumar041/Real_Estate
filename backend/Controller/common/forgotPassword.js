const nodeMailer = require('nodemailer')
const { IdGenerator } = require('custom-random-id')
const dateTime = require('./dateTime')
const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema')

const ForgotPassword = async (req, res, next) => {
    try {

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            return res.status(sts).json(data)
        }

        const email = req.query.email,
            userId = req.query.userId
        var sellerData, buyerData;

        const createOtp = new IdGenerator("{{ number_4 }}");
        const otp = createOtp.getFinalExpression();

        if (userId) {
            sellerData = await sellerSchema.findOne({ _id: userId })
            buyerData = await buyerSchema.findOne({ _id: userId })
        } else {
            sellerData = await sellerSchema.findOne({ email: email })
            buyerData = await buyerSchema.findOne({ email: email })
        }


        const userData = sellerData || buyerData


        if (userData && userData) {

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'sureshkumarselvaraj041@gmail.com',
                    pass: 'ztnmltquacaslzgz'
                }
            })

            const mailOptions = {
                from: `Real Estate <sureshkumarselvaraj041@gmail.com>`,
                to: userData.email,
                subject: 'Send Otp',
                text: `Hi ${userData.userName} \n
                 Your OTP to verify your account in Real Estate Website is: ${otp}, For security reasons, please do not share it with anyone.
                 \n It expires in 5 minutes`

            }

            time = dateTime().currentTime.split(':'),
                hours = time[0],
                minutes = parseInt(time[1].split(' ')[0]) + 5
            var saveHours = minutes > 60 ? parseInt(hours) + 1 : hours
            saveHours = saveHours % 12
            var crt = saveHours + ':' + minutes + " " + time[1].split(' ')[1]

            const update = {
                $set: {
                    otp: otp,
                    expireOtpTime: {
                        expireDate: dateTime().currentDate,
                        expireTime: crt
                    }
                }
            }

            if (userData.role === 'Buyer') {
                await buyerSchema.updateOne({ _id: userData._id }, update)
                    .then(resp => resp)
                    .catch(err => console.log('Err resp: ', err.message))
            } else {
                await sellerSchema.updateOne({ _id: userData._id }, update)
                    .then(resp => resp)
                    .catch(err => console.log('Err resp: ', err.message))
            }

            transporter.sendMail(mailOptions, (err, resp) => {
                if (err) {
                    console.log('Err: ', err.message);
                    sendResponse(420, 'Failed', err.message)
                } else {
                    const data = {
                        userId: userData._id,
                        message: 'Otp sent in your email address'
                    }
                    sendResponse(200, 'Success', data)
                }
            })
        } else {
            // Not Found
            sendResponse(404, 'Failed', 'Invalid Email')
        }
    } catch (err) {
        console.log('Errr: ', err.message);
        const data = {
            status: 500,
            message: 'Failed',
            data: err.message
        }
        return res.status(500).json(data)
    }
}

module.exports = ForgotPassword;