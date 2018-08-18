var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'grill'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 40,
    title: 'Pommes Frittes',
    description: '',
    type: 'grill',
    price: 35
  }),
  new Product({
    number : 41,
    title: 'Kebab spceial',
    description: 'Med salat, pommes frites og flute',
    type: 'grill',
    price: 60
  }),
  new Product({
    number : 42,
    title: 'Big burger',
    description: 'med 1 bøf',
    type: 'grill',
    price: 35,
  }),
  new Product({
    number : 43,
    title: 'Bacon børger',
    description: 'med 1 bøf og bacon',
    type: 'grill',
    price: 40
  }),
  new Product({
    number : 44,
    title: 'Jumbo burger',
    description: 'med dobbelt bøf',
    type: 'grill',
    price: 50
  }),
  new Product({
    number : 45,
    title: 'Cheese burger',
    description: 'med 1 øf og ost',
    type: 'grill',
    price: 40,
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
});
