const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = new schema({
    propertyFor: { type: String }
}, {
    versionKey: false
});

const addPropertyFor = mongoose.model('Property For', Schema);
module.exports = addPropertyFor;