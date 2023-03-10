const mongoose = require('mongoose');

require('./collection');
const itemSchema = require('./itemSchema');

module.exports = mongoose.model('Item', itemSchema);