const propertySchema = require('../../model/postproperty');

const cartImage = async (req, res, next) => {
    try {

        const city = req.query.city,
            state = req.query.state,
            propertyFor = req.query.propertyFor;
        var uploadingData = []

        const sendResponse = value => {
            const data = {
                data: value
            };
            return res.status(200).json({ data: uploadingData });
        }

        if (city && state && propertyFor) {
            uploadingData = await propertySchema.aggregate([{ $match: { city: city, state: { $regex: new RegExp(`^${state}.*i`) }, propertyFor: propertyFor } }])
            return sendResponse(uploadingData)
        } else if (city && state) {
            uploadingData = await propertySchema.aggregate([{ $match: { city: city, state: state } }])
            return sendResponse(uploadingData)
        } else if (city && propertyFor) {
            uploadingData = await propertySchema.aggregate([{ $match: { city: city, propertyFor: propertyFor } }])
            return sendResponse(uploadingData)
        } else if (state && propertyFor) {
            uploadingData = await propertySchema.aggregate([{ $match: { state: state, propertyFor: propertyFor } }])
            return sendResponse(uploadingData)
        } else if (city || state || propertyFor) {
            uploadingData = await propertySchema.aggregate([{ $match: { $or: [{ city: city }, { state: { $regex: state } }, { propertyFor: propertyFor }] } }])
            return sendResponse(uploadingData)
        } else {
            uploadingData = await propertySchema.aggregate([{ $match: {} }])
            return sendResponse(uploadingData)
        }
        // const uploadingData = await propertySchema.find();

    } catch (error) {
        res.status(400).json({ data: error.message });
    }
}

module.exports = cartImage;