const sellerSchema = require('../../model/sellerSchema');
const buyerSchema = require('../../model/buyerSchema');
const crypto = require('crypto-js');

const signup = async (req, res, next) => {
    try {
        const { userName, email, role, phoneNumber, password } = await req.body;

        const sendResponse = (sts, state, msg) => {
            return res.status(sts).json({
                "Status": state,
                "Message": msg
            });
        }

        // Checking if  username and email already exists or not ...!
        const buyerUser = await buyerSchema.findOne({ userName: userName }) || await buyerSchema.findOne({ email: email });
        const sellerUser = await sellerSchema.findOne({ userName: userName }) || await sellerSchema.findOne({ email: email });

        console.log("Buyer user: ", buyerUser, "Seller user: ", sellerUser);

        if (buyerUser || sellerUser) {
            console.log("exists");
            sendResponse(400, 'Failed', 'Username or email already...! ');
            return true;
        }
        else {
            if (role === 'Buyer') {
                console.log("Buyer");
                const userInput = new buyerSchema(req.body);

                // Encrypt the Password
                userInput.password = crypto.AES.encrypt(userInput.password, 'abcdefg').toString();

                // Buyer data storing in the database
                await userInput.save();
                sendResponse(200, "Success", "Successfully registered");
                console.log("Successfully registered");
                return true;
            } else {
                console.log("Seller");
                const userInput = new sellerSchema(req.body);

                // Encrypt the Password
                userInput.password = crypto.AES.encrypt(userInput.password, 'abcdefg').toString();

                // Seller data storing in the database
                await userInput.save();
                sendResponse(200, "Success", "Successfully registered");
                console.log("Successfully registered");
                return true;
            }
        }

    }
    catch (error) {
        console.log(error.message);
        // sendResponse(400, 'Falied', error.message)
        return next();
    }
    next();
};

module.exports = signup;