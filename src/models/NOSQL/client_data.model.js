const mongoose = require('mongoose');
const {Schema} = mongoose;
const autoIncrement = require('mongoose-auto-increment');

const client_dataSchema = new Schema({
    link_from: {type: String, required: false},
    location: {type: String, required: false},
    latitude: {type: String, required: false},
    longitude: {type: String, required: false},
    fingerprint: {type: String, required: false},
    user_agent: {type: String, required: false},
    browser: {type: String, required: false},
    engine: {type: String, required: false},
    os: {type: String, required: false},
    device: {type: String, required: false},
    cpu: {type: String, required: false},
    isMobile: {type: Boolean, required: false},
    isAndroid: {type: Boolean, required: false},
    isIos: {type: Boolean, required: false},
    ip: {type: String, required: false},
    timezone: {type: String, required: false},
    language: {type: String, required: false},
    dt_reg: {type: Date, required: false},
    number: {type: Number, required: false}
});

client_dataSchema.plugin(autoIncrement.plugin, {model: 'client_data', field: 'number'});

module.exports = mongoose.model('client_data', client_dataSchema);