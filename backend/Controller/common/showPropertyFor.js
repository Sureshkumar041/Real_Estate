const addPropertyFor = require('../../model/addPropertyFor')

const showPropertyFor = async (req, res, next) => {
  try {
    const propertyFor = await addPropertyFor.find()
    const data = {
      message: 'Success',
      data: propertyFor
    }
    res.status(200).json({ data: data })
    
  } catch (err) {
    console.log('Show Property for: ', err.message)
    const data = {
      message: 'Failed',
      data: 'No property type'
    }
    res.status(400).json({ data: data })
    next();
  }
}

module.exports = showPropertyFor;
