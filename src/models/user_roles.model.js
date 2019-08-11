const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserRoleSchema = new Schema({
    name: { type: String, required: false },
    description: { type: String, required: true },
    dt_reg: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('UserRole', UserRoleSchema);
