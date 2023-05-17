const locationSchema = require('../../model/locationSchema');

const showLocation = async (req, res, next) => {
    try {
        const location = await locationSchema.find();
        // console.log("Location: ", location);
        const data = {
            status: 200,
            location: location
        }
        return res.json({ data: data });
    } catch (err) {
        console.log('Error: ', err.message);
    }
}

module.exports = showLocation;