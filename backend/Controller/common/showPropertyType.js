const addingPropertyType = require('../../model/addPropertyType')

const showPropertyType = async (req, res, next) => {
    try {
        const propertytype = await addingPropertyType.find();
        const data = {
            message: 'Success',
            data: propertytype
        }
        res.status(200).json({ data: data })
    } catch (err) {
        const data = {
            message : 'Failed',
            data : 'Enable to get property type'
        }
    }
}

module.exports = showPropertyType;