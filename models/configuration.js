let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let configurationSchema = Schema({
    configkey: String,
	configvalue: String
},{
	collection: 'configuration'
});

module.exports = mongoose.model('Configuration', configurationSchema);