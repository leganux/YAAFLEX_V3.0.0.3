const mongoose = require('mongoose');
const { Schema } = mongoose;

const CitySchema = new Schema({
    id: { type: Number, required: false },
    name: { type: String, required: false },
    state_id: { type: String, required: false },
});

module.exports = mongoose.model('City', CitySchema);
