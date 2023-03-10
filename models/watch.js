const mongoose = require('mongoose');

require('./collection');
const watchSchema = require('./watchSchema');

module.exports = mongoose.model('Watch', watchSchema);