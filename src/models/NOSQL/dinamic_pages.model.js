const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = require('./user.model');

const DPSchema = new Schema({
    title: { type: String, required: false },
    f_name: { type: String, required: false, unique: true },
    html: { type: String, required: false },
    dt_reg: { type: Date, required: false },
    dt_update: { type: Date, required: false },
    active: { type: Boolean, required: false },
    autor: { type: Schema.Types.ObjectId, required: false, ref: user },
});

module.exports = mongoose.model('dinamic_page', DPSchema);
