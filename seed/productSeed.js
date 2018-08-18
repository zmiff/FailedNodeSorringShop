var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sorringPizza');

var products = [
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
}),
new Product({
  number : 5,
  title: '',
  description: '',
  type: 'varme retter',
  price: ,
  largePrice:
})
];

var done = 0;
(async () => {
    for (var i=0; i<products.length; i++){
      await products[i].save();
      done++;
      if(done===products.length){
        mongoose.disconnect();
      }
    }
})();
