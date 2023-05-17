const propertySchema = require('../../model/postproperty');

const deleteProperty = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = { _id: id }
        const result = await propertySchema.deleteOne(filter);
        console.log("Result: ", result);
        if (result.deletedCount === 1) {
            const data = {
                message: 'Success',
                data: 'Property deleted successfully'
            }
            res.status(200).json({ data: data })
        } else {
            throw new Error('Unable to delete')
        }
    } catch (err) {
        const data = {
            message: 'failed',
            data: err.message
        }
        res.status(400).json({ data: data })
    }
}

module.exports = deleteProperty;