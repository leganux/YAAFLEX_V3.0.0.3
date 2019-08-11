const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = require('./user.model');
const articleSchema = new Schema({
    title: { type: String, required: false },
    f_name: { type: String, required: false, unique: true },
    thumbnail: { type: String, required: false },
    extract: { type: String, required: false },
    html: { type: String, required: false },
    dt_reg: { type: Date, required: false },
    dt_update: { type: Date, required: false },
    active: { type: Boolean, required: false },
    autor: { type: Schema.Types.ObjectId, required: false, ref: user },
    tags: { type: String, required: false },

});

module.exports = mongoose.model('Article', articleSchema);
