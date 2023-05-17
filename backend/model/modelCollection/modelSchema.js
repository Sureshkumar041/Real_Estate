const buyerSchema = require('../buyerSchema')
const sellerSchema = require('../sellerSchema')
const sendEmailSchema = require('../sendEmailSchema')
const propertySchema = require('../postproperty')

const ModelSchema = () => {
    const schema = {
        sellerSchema,
        buyerSchema,
        sendEmailSchema,
        propertySchema
    }

    return schema
}

module.exports = ModelSchema;