const locationSchema = require('../model/locationSchema');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.token;
        jwt.verify(token, 'secret-key', async (err, validate) => {
            if (err) {
                res.status(400).json({ data: err.message });
            }
            else {
                console.log("Valid user ...!")
                const location = await locationSchema.find();
                const data = {
                    status: 200,
                    location: location
                }
                res.status(200).json({ data: data });
                next();
            }
        })
    } catch (err) {
        console.log('Error: ', err.message);
    }
}

module.exports = auth;