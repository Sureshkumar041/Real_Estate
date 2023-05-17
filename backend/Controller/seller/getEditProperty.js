const propertySchema = require('../../model/postproperty');

const getEditProperty = async (req, res, next) => {
    try {
        // const propertyId = req.params.id;
        const propertyId = req.query.propertyId;
        await propertySchema.aggregate([{ $match: { propsId: propertyId } }])
            .then(resp => {
                const data = {
                    message: 'Success',
                    data: resp[0]
                }
                res.status(200).json({ data: data })
            })
    } catch (err) {
        const data = {
            message: 'Failed',
            data: err.message
        }
        res.status(400).json({ data: data })
    }
}

module.exports = getEditProperty;