const mongoose = require('mongoose')
const schema = mongoose.Schema

const Schema = new schema(
  {
    propertyType: { type: String }
  },
  {
    versionKey: false
  }
)

const addPropertyType = mongoose.model('Property Type', Schema)
module.exports = addPropertyType
