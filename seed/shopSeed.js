var Shop = require('../models/shop');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

var shop = new Shop({
  timeId: 1,
  pickupTime: 1200000,
  deliveryTime: 2700000
});

shop.save().catch((e)=>{
  console.log(e);
}).then(()=>{
  console.log('Updated times: '+shop.pickupTime+' '+shop.deliveryTime);
  mongoose.disconnect();
  }
);
