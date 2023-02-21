const mongoose = require('mongoose');

const sourceTemplateSchema = new mongoose.Schema({
    type: {
        required: true,
        type: String
    },
    fields: {
        required: true,
        type: JSON
    }
})

module.exports = mongoose.model('sourcetemplates', sourceTemplateSchema)