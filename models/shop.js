var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  timeId: {type: Number},
  pickupTime: {type: Number},
  deliveryTime: {type: Number}
});

module.exports = mongoose.model('Shop', schema)
