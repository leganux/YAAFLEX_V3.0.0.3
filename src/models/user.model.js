const mongoose = require('mongoose');
const { Schema } = mongoose;

const User_Roles = require('./user_roles.model');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: false },
    dt_reg: { type: Date, required: true },
    role: { type: Schema.Types.ObjectId, required: false, ref: User_Roles },

    
    provider_id: { type: String, required: false },
    provider: { type: String, required: false },
    user_picture: { type: String, required: false },
    full_name: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
   
    gender: { type: String, required: false },
    lang: { type: String, required: false },
    age: { type: String, required: false },
    phone: { type: String, required: false },
    cellphone: { type: String, required: false },
    bio: { type: String, required: false },
    country: { type: Number, required: false },
    state: { type: Number, required: false },
    city: { type: String, required: false },
    adress: { type: String, required: false },
    zip_code: { type: String, required: false },
    facebook_uri: { type: String, required: false },
    instagram_uri: { type: String, required: false },
    twitter_uri: { type: String, required: false },
    youtube_uri: { type: String, required: false },

});

module.exports = mongoose.model('User', UserSchema);
