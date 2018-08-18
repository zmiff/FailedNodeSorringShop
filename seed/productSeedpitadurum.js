var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'pitaDurum'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 75,
    title: 'Pita kebab',
    description: 'Med salat og dressing',
    type: 'pitaDurum',
    price: 50,
  }),
  new Product({
    number : 76,
    title: 'Pita Tun',
    description: 'Med salat og dressing',
    type: 'pitaDurum',
    price: 50
  }),
  new Product({
    number : 77,
    title: 'Pita Kylling',
    description: 'Med salat og dressing',
    type: 'pitaDurum',
    price: 50
  }),
  new Product({
    number : 78,
    title: 'Durum kebab',
    description: 'Med salat og dressing',
    type: 'pitaDurum',
    price: 60
  }),
  new Product({
    number : 79,
    title: 'Durum Kylling',
    description: 'Med salat og dressing',
    type: 'pitaDurum',
    price: 60
  }),
  new Product({
    number : 80,
    title: 'Durum Skinke',
    description: 'Med ost, salat og dressing',
    type: 'pitaDurum',
    price: 60
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
