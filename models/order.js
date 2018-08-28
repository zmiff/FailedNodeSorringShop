var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {type : Schema.Types.ObjectId, ref: 'User'},// this line tells mongoose that the user is taken from the user model
  cart: {type: Object, required: true},
  name: {type: String},
  address: {type: String},
  paymentId: {type: String},
  paymentType: {type: String, required: true},
  deliveryType: {type: String, requried: true},
  dateTime: {type: Date, required: true},
  delDateTime: {type: Date, required: true},
  delTime: {type: String},
  delDate: {type: String},
  route: {type: Object},
  customerDetails: {type:Object},
  processed: {type: Boolean, required: true},
  status: {type: String},
  delType: {type: String},
  timeType: {type: String}
});

module.exports = mongoose.model('Order', schema)
