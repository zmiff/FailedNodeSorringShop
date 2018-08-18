var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'pizzaSpc'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 30,
    title: 'Memoli',
    description: 'Med tomat, ost, kebab, løg, salat og dressing.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 31,
    title: 'Milas',
    description: 'Med tomat, ost, skinke, kebab, champignon, bacon, løg, majs, salat og dressing..',
    type: 'pizzaSpc',
    price: 70,
    largePrice: 150
  }),
  new Product({
    number : 32,
    title: 'Julie',
    description: 'Med tomat, ost, kødsauce, pepperoni, majs og ananas.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 33,
    title: 'Ulla',
    description: 'Med tomat, ost, kebab, ananas, frisk tomat, salat og dressing.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 34,
    title: 'Rasmus',
    description: 'Med tomat, ost, ananas, løg, bacon og cocktailpølser.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 35,
    title: 'Per',
    description: 'Med tomat, ost, kebab, ananas, pepperoni og gorgonzola.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 36,
    title: 'Burhan',
    description: 'Med tomat, ost, kebab, pepperoni, salat og dressing.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 37,
    title: 'Rana',
    description: 'Med tomat, ost, oksekød, majs, ærter og grøn peber.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 130
  }),
  new Product({
    number : 38,
    title: 'Mehmet',
    description: 'Med tomat, ost, oksekød, spaghetti, champignon, løg og gorgonzola.',
    type: 'pizzaSpc',
    price: 65,
    largePrice: 140
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
