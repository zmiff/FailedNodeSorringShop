var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/sorringPizza');

(async () => {
    let remove = await Product.find({type: 'varmeRetter'});
    console.log('lenght: '+remove.length);
    for (var i=0; i<remove.length; i++){
      id = remove[i]._id;
      await Product.findByIdAndRemove({_id: id});
      console.log('removed '+remove[i].title)
    }
})().then(()=>{
  var products = [
  new Product({
    number : 65,
    title: 'Plankebøf',
    description: 'Med pommes sautes, tzatziki, dressing og bearnaisesauce',
    type: 'varmeRetter',
    price: 70
  }),
  new Product({
    number : 66,
    title: 'Halv kylling',
    description: 'Med pommes frites, tzatziki, dressing, remoulade og ketchup',
    type: 'varmeRetter',
    price:65
  }),
  new Product({
    number : 67,
    title: 'Fiskefilet',
    description: 'Med pommes frites, salat, dressing og remoulade',
    type: 'varmeRetter',
    price:60
  }),
  new Product({
    number : 68,
    title: 'Spaghetti Bolognese',
    description: 'Med kødsauce',
    type: 'varmeRetter',
    price: 50
  }),
  new Product({
    number : 69,
    title: 'Spghettimix',
    description: 'Med kødsauce, cocktailpølser og kebab',
    type: 'varmeRetter',
    price:60
  }),
  new Product({
    number : 70,
    title: 'Kyllingefilet',
    description: 'Ca. 200g med pommes sautes, tzatziki og bearnaisesauce',
    type: 'varmeRetter',
    price: 70
  }),
  new Product({
    number : 71,
    title: 'Nuggets',
    description: '8 stk med pommes frites, ketchup og remoulade',
    type: 'varmeRetter',
    price:55
  }),
  new Product({
    number : 72,
    title: 'Steak',
    description: 'Ca. 200g oksefilet med pommes sautes, tzatziki og bearnaiseasauce',
    type: 'varmeRetter',
    price:85
  }),
  new Product({
    number : 73,
    title: 'Grillmix',
    description: '100g steak, 100g bøf og 100g kyllingefilet. Med pommes sautes, tzatziki og bearnaisesauce',
    type: 'varmeRetter',
    price:125
  }),
  new Product({
    number : 74,
    title: 'Græsk bøf',
    description: '300g hakket bøf med pommes sautes, tzatziki og hvidløgsbrød',
    type: 'varmeRetter',
    price:130
    }),

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
