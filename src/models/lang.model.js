const mongoose = require('mongoose');
const { Schema } = mongoose;

const LangSchema = new Schema({

    name: { type: String, required: false },
    code: { type: String, required: false },

});

module.exports = mongoose.model('i18n', LangSchema);
