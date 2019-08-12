const mongoose = require('mongoose');
const { Schema } = mongoose;
var dataTables = require('mongoose-datatables')

const SatateSchema = new Schema({
    id: { type: Number, required: false },
    name: { type: String, required: false },
    country_id: { type: String, required: false },
});

SatateSchema.plugin(dataTables)
module.exports = mongoose.model('State', SatateSchema);
