const addPropertyType = require('../../model/addPropertyType')

const addingPropertyType = async (req, res, next) => {
  try {
    console.log('Property Type...!')
    console.log('Data: ', req.body.propertyType)
    const data = {
      message: 'Success',
      data: 'Property type added successfully'
    }
    const addingProperty = new addPropertyType(req.body)
    await addingProperty.save(function (err) {
      if (!err) {
        console.log('addingProperty: ', addingProperty)
        res.status(200).json({ data: data })
        return true
      }
    })
  } catch (err) {
    const data = {
      message: 'Failed',
      data: 'Enable to add'
    }
    return res.status(400).json({ data: data })
    next()
  }
}

module.exports = addingPropertyType
