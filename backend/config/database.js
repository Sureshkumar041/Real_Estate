require('dotenv').config();
const { mongoUrl } = process.env;
const mongoose = require('mongoose');

// Database connection
const connect = () => {
    console.log(mongoUrl);
    mongoose.set('strictQuery', true)
    mongoose.connect(mongoUrl)
        .then(() => console.log("Database connected successfully ...!"))
        .catch((err) => {
            console.log("Error: ", err.message)
            console.log("Database enable to connect...!");
        })
};

module.exports = connect;


// port = 3333
// #mongoUrl = mongodb://localhost:27017/Realestate
// mongoUrl = mongodb://127.0.0.1:27017/Realestate
// # 127.0.0.1