const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
    filename: { type: String, required: false },
    original: { type: String, required: false },
    public_path: { type: String, required: false },
    disk_path: { type: String, required: false },
    folder: { type: String, required: false },

});

module.exports = mongoose.model('File', FileSchema);
