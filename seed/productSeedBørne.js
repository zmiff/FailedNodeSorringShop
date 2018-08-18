var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'børne'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 90,
    title: 'Børnepizza med skinke',
    description: 'Med tomat, ost, skinke og cocktailpølser',
    type: 'børne',
    price: 40
  }),
  new Product({
    number : 91,
    title: 'Børnepizza med peperoni',
    description: 'Med tomat, ost, pepperoni og cocktailpølser',
    type: 'børne',
    price: 40
  }),
  new Product({
    number : 92,
    title: 'Børnepizza med kebab',
    description: 'Med tomat, ost, kebab og bacon',
    type: 'børne',
    price: 40
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
