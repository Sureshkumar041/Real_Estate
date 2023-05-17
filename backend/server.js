const express = require('express');
const app = express(),
    path = require("path")

const cors = require('cors');
require('dotenv').config();
const connect = require('./config/database');
const CronFunc = require('./middleware/cron');

// Set middleware
app.use(cors());
app.use(express.json());

// API ...
app.use('/', require('./routes/route'));

app.set("public", "./public");
app.use("/", express.static(path.join(__dirname, "public")))
app.use('/documents', express.static('documents'))
app.use('/profileImages', express.static('profileImages'))
app.use("/uploads", express.static(path.join(__dirname, "/uploads"), { maxAge: 7 * 86400000 }));
// app.use( "/documents",express.static(path.join(__dirname, "/documents"), { maxAge: 7 * 86400000 }));

// Database Connction
connect()

// Set port , listen for request
const { port } = process.env;
app.listen(port, () => {
    console.log("Server running successfully in ", port);
    // CronFunc()
})