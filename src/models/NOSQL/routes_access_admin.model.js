const mongoose = require('mongoose');
const { Schema } = mongoose;

rolesAdmin = require('./admin_roles.model');

const RAASchema = new Schema({

    description: { type: String, required: false },
    path: { type: String, required: false },
    method: { type: String, required: false },
    roles: [{ type: Schema.Types.ObjectId, required: false, ref: rolesAdmin }],
});

module.exports = mongoose.model('RoutesAdmin', RAASchema);
