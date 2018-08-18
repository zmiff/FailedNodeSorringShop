var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'Topping'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    title: 'Peperoni',
    type: 'Topping',
    price: 8,
    largePrice: 15
  }),
  new Product({
    title: 'Dressing',
    type: 'Topping',
    price: 0,
    largePrice: 0
  }),
  new Product({
    title: 'Grøn peber',
    type: 'Topping',
    price: 5,
    largePrice: 10
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
