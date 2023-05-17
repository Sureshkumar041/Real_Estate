const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = new schema({
    no: { type: Number },
    location: { type: String }
}, {
    versionKey: false
});

const locationSchema = mongoose.model('Location Schema', Schema);

module.exports = locationSchema;