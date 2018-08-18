var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  type: {type: String, required: true},
  price: {type: Number, required: true},
  largePrice: {type: Number}
});

module.exports = mongoose.model('Product', schema)
