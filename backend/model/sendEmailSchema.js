const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = new schema({
    userId: { type: String },
    userName: { type: String },
    email: { type: String },
    recentSearch: [
        {
            city: { type: String },
            propertyType: { type: String },
            searchDate: { type: String }
        }
    ]
}, {
    versionKey: false
});

const userActivity = mongoose.model('User Activity', Schema);
module.exports = userActivity;