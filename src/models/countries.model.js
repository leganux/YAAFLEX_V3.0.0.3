const mongoose = require('mongoose');
const {Schema} = mongoose;
var dataTables = require('mongoose-datatables')


const CountrySchema = new Schema({
    id: {type: Number, required: false},
    shortname: {type: String, required: false},
    name: {type: String, required: false},
    phoneCode: {type: String, required: false},
});

CountrySchema.plugin(dataTables)
module.exports = mongoose.model('Country', CountrySchema);
