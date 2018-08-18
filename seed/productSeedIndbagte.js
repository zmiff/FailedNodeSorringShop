var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'indbagt'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
    new Product({
      number : 60,
      title: 'Calzone 1',
      description: 'Med tomat, ost, spaghetti, kødsauce og majs.',
      type: 'indbagt',
      price: 60
    }),
    new Product({
      number : 61,
      title: 'Calzone 2',
      description: 'Med tomat, ost, champignon, skinke, cocktailpølser og kødsauce.',
      type: 'indbagt',
      price: 65
    }),
    new Product({
      number : 62,
      title: 'Calzone 3',
      description: 'Med tomat, ost, kebab, rejer, pepperoni og paprika.',
      type: 'indbagt',
      price: 70
    }),
    new Product({
      number : 63,
      title: 'Åben Calzone',
      description: 'Med tomat, ost, kebab, kødsauce, løg og paprika.',
      type: 'indbagt',
      price: 70
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
