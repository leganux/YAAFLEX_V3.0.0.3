const mongoose = require('mongoose');
const env = require('./config/environment.config')
const URI = 'mongodb://' + env.noSQLDB_host + '/' + env.noSQLDB_name;
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(URI, {useNewUrlParser: true})
    .then(db => console.log('DB is connected'))
    .catch(error => console.error(error));

autoIncrement.initialize(mongoose);


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;