const { IdGenerator } = require('custom-random-id');
const propertySchema = require('../../model/postproperty')

const filterCartImage = async (req, res, next) => {
    try {
        const city = req.query.city,
            propertyFor = req.query.propertyFor,
            currentPage = req.query.currentPage,
            dataPerPage = 3,
            start = currentPage * dataPerPage - dataPerPage;

        const sendResponse = (sts, message, property, dataSize) => {
            const totalPage = Math.ceil(dataSize / dataPerPage);
            const data = {
                status: sts,
                message: message,
                data: property,
                totalPage: totalPage,
                dataSize: dataSize
            }
            res.status(sts).json({ data })
        }

        // Check Location & ProperttyFor
        if (city !== '' && propertyFor !== '') {
            const dataSize = await propertySchema.aggregate([{ $match: { city: city, propertyFor: propertyFor, status: 'Active' } }, { $count: 'count' }]);
            const property = await propertySchema.aggregate([{ $match: { city: city, propertyFor: propertyFor, status: 'Active' } }, { $skip: start }, { $limit: dataPerPage }])
            if (dataSize.length !== 0) {
                sendResponse(200, 'Success', property, 0 || dataSize[0].count)
            } else {
                sendResponse(200, 'Success', property, 0)
            }
        } else {
            // Chk Locations
            if (city !== '') {
                const dataSize = await propertySchema.aggregate([{ $match: { city: city, status: 'Active' } }, { $count: 'count' || 0 }]);
                const property = await propertySchema.aggregate([{ $match: { city: city, status: 'Active' } }, { $skip: start }, { $limit: dataPerPage }])
                if (dataSize.length !== 0) {
                    sendResponse(200, 'Success', property, 0 || dataSize[0].count)
                } else {
                    sendResponse(200, 'Success', property, 0)
                }
            } else {
                // Chk PropertyFor
                if (propertyFor !== '' && propertyFor !== '') {
                    const dataSize = await propertySchema.aggregate([{ $match: { propertyFor: propertyFor, status: 'Active' } }, { $count: 'count' }])
                    const property = await propertySchema.aggregate([{ $match: { propertyFor: propertyFor, status: 'Active' } }, { $skip: start }, { $limit: dataPerPage }])
                    if (dataSize.length !== 0) {
                        sendResponse(200, 'Success', property, 0 || dataSize[0].count)
                    } else {
                        sendResponse(200, 'Success', property, 0)
                    }
                } else {
                    // Get All Active Property
                    const dataSize = await propertySchema.aggregate([{ $match: { status: 'Active' } }, { $count: 'count' }])
                    const property = await propertySchema.aggregate([{ $match: { status: 'Active' } }, { $skip: start }, { $limit: dataPerPage }]);
                    if (dataSize.length !== 0) {
                        sendResponse(200, 'Success', property, 0 || dataSize[0].count)
                    } else {
                        sendResponse(200, 'Success', property, 0)
                    }
                }
            }
        }

    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        res.status(400).json({ data })
    }
}

module.exports = filterCartImage;