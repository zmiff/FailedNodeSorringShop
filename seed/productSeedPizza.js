var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'pizza'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 1,
    title: 'Sorring',
    description: 'Med tomat, ost, skinke, kebab, champignon, bacon og løg.',
    type: 'pizza',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 2,
    title: 'Paradis',
    description: 'Med tomat, ost, pepperoni, cocktailpølser, paprika og frisk tomat.',
    type: 'pizza',
    price: 65,
    largePrice: 140
  }),
  new Product({
    number : 3,
    title: 'Margherita',
    description: 'Med tomat, ost, kebab, paprika og majs.',
    type: 'pizza',
    price: 60,
    largePrice: 130
  }),
  new Product({
    number : 4,
    title: 'Napoli',
    description: 'Napoli: Med tomat, ost og skinke.',
    type: 'pizza',
    price: 55,
    largePrice: 115
  }),
  new Product({
    number : 5,
    title: 'Fantasia',
    description: 'Med tomat, ost, champignon, bacon, løg og grøn peber.',
    type: 'pizza',
    price: 60,
    largePrice: 135
  }),
  new Product({
    number : 6,
    title: 'Hawaii',
    description: 'Med tomat, ost, skinke, rejer og ananas.',
    type: 'pizza',
    price: 60,
    largePrice: 130
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
