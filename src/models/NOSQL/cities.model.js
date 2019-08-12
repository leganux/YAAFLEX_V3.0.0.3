const mongoose = require('mongoose');
const {Schema} = mongoose;
var dataTables = require('mongoose-datatables')

const CitySchema = new Schema({
    id: {type: Number, required: false},
    name: {type: String, required: false},
    state_id: {type: String, required: false},
});

CitySchema.plugin(dataTables)
module.exports = mongoose.model('City', CitySchema);
