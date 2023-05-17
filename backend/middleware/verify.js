const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (typeof authorization !== 'undefined') {
            req.token = authorization;
            jwt.verify(authorization, 'secret-key', async (err, validateuser) => {
                if (err) {
                    const data = {
                        message: 'Failed',
                        valid: 'token',
                        data: err.message
                    }
                    return res.status(400).json({ data: data })
                }
                else {
                    next();
                }
            })
        } else {
            throw new Error('Need token')
        }
    } catch (err) {
        const data = {
            message: 'Failed',
            data: err.message
        }
        res.status(400).json({ data: data })
    }
}

module.exports = verifyToken;