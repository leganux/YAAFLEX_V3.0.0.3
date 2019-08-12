const mongoose = require('mongoose');
const { Schema } = mongoose;

const SatateSchema = new Schema({
    id: { type: Number, required: false },
    name: { type: String, required: false },
    country_id: { type: String, required: false },
});

module.exports = mongoose.model('State', SatateSchema);
