var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'drink'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 50,
    title: 'Coca Cola',
    description: '1,5 L',
    type: 'drink',
    price: 30
  }),
  new Product({
    number : 51,
    title: 'Coca Cola',
    description: '0,5 L',
    type: 'drink',
    price: 20
  }),
  new Product({
    number : 52,
    title: 'Coca Cola Light',
    description: '1,5 L',
    type: 'drink',
    price: 30
  }),
  new Product({
    number : 53,
    title: 'Sprite',
    description: '1,5 L',
    type: 'drink',
    price: 30
  }),
  new Product({
    number : 54,
    title: 'Fanta',
    description: '1,5 L',
    type: 'drink',
    price: 30
  }),
  new Product({
    number : 55,
    title: 'Kildevand',
    description: '0,5 L',
    type: 'drink',
    price: 10
  }),
  new Product({
    number : 56,
    title: 'Carlsberg',
    description: ' Øl',
    type: 'drink',
    price: 15
  }),
  new Product({
    number : 57,
    title: 'Tuborg',
    description: 'Øl',
    type: 'drink',
    price: 15
  }),
  new Product({
    number : 58,
    title: 'Husets Rødvin',
    description: '70 cL',
    type: 'drink',
    price: 80
  }),
  new Product({
    number : 59,
    title: 'Husets Hvidvin',
    description: '70 cL',
    type: 'drink',
    price: 80
  })
  ];

  var done = 0;
  (async () => {
      for (var i=0; i<products.length; i++){
        await products[i].save();
        console.log('added: '+products[i].title)
        done++;
        if(done===products.length){
          mongoose.disconnect();
        }
      }
  })();
})
