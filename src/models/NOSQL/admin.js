const mongoose = require('mongoose');
const { Schema } = mongoose;
const Admin_Role = require('./admin_roles.model')

const AdminSchema = new Schema({
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: Schema.Types.ObjectId, required: false, ref: Admin_Role },
    dt_reg: { type: Date, required: true },
    active: { type: Boolean, required: true },
});

module.exports = mongoose.model('Admin', AdminSchema);
