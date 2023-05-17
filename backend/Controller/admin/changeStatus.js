const { default: jwtDecode } = require('jwt-decode')
const propertySchema = require('../../model/postproperty')

const ChangeStatus = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token)

        const sendResponse = (sts, msg, info) => {
            const data = {
                status: sts,
                message: msg,
                data: info
            }
            res.status(sts).json(data);
        }

        if (decode.role === 'Admin') {
            const propertyId = req.query.propertyId;
            const status = req.query.status;
            const filter = {
                _id: propertyId
            };
            const update = {
                $set: {
                    status: status
                }
            }
            if (propertyId) {
                const result = await propertySchema.findByIdAndUpdate(filter, update)
                sendResponse(200, 'Success', 'Status changed successfully')
            }
        } else {
            sendResponse(401, 'Failed', 'Cannot access this page')
        }
    } catch (err) {
        console.log("Err: ", err.message);
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        res.status(400).json(data)
    }
}

module.exports = ChangeStatus;