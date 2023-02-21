const mongoose = require('mongoose');

const configPayloadSchema = new mongoose.Schema({
    sourceType:{
        type: String,
        required: true
    },
    payload:{
        type: JSON
    }
})

module.exports = mongoose.model('configpayloads', configPayloadSchema)