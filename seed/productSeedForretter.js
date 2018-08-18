var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'forretter'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
    new Product({
      number : 80,
      title: 'Tzatziki',
      description: 'Med agurk, hvidløg, flute og smør.',
      type: 'forretter',
      price: 40,
    }),
    new Product({
      number : 81,
      title: 'Rejecocktail',
      description: ' Med flute og smør.',
      type: 'forretter',
      price: 40,
    }),
    new Product({
      number : 82,
      title: 'Græsk Salat',
      description: 'Med fetaost, agurk, tomat, oliven, flute og smør.',
      type: 'forretter',
      price: 40,
    }),
    new Product({
      number : 83,
      title: 'Bacon Salat',
      description: 'Med bacon, kylling, icebergsalat, ananas, majs og løg. Serveres med flute.',
      type: 'forretter',
      price: 40,
    }),
    new Product({
      number : 84,
      title: 'Hvidløgsbrød',
      description: 'Med ost.',
      type: 'forretter',
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
