const mongoose = require('mongoose');
const { Schema } = mongoose;

rolesUser = require('./user_roles.model');

const RUASchema = new Schema({

    description: { type: String, required: false },
    path: { type: String, required: false },
    method: { type: String, required: false },
    roles: [{ type: Schema.Types.ObjectId, required: false, ref: rolesUser }],
});

module.exports = mongoose.model('RoutesUser', RUASchema);
