const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Product = require('../models/product');
const Order = require('../models/order');
const Shop = require('../models/shop')
const Cart = require('./../JS/cart');

var middleware = require('./../js/middleware.js');
var geocode = require('./../js/geocode');
var functions = require('./../js/functions');


/* GET home page. */
router.get('/', async(req, res, next)=>{
  let pizzas = await Product.find({type: 'pizza'});
  let pizzaspc = await Product.find({type: 'pizzaSpc'});
  let grill = await Product.find({type: 'grill'});
  let drink = await Product.find({type: 'drink'});
  let forretter = await Product.find({type: 'forretter'});
  let varmeretter = await Product.find({type: 'varmeRetter'});
  let indbagt = await Product.find({type: 'indbagt'});
  let pitadurum = await Product.find({type: 'pitaDurum'});
  let børne = await Product.find({type: 'børne'});
  res.render('shop/index', {
    pizzas,
    pizzaspc,
    grill,
    drink,
    indbagt,
    varmeretter,
    forretter,
    pitadurum,
    børne
  })
});//end home page

  router.get('/add-to-cart/:id', function(req, res, next){
    // get the added product id
    var productId = req.params.id;
    //we create a new cart everytime the add button is pressed, and the old cart is inserted to the new cart. the old cart is already stored in the session req.session.cart ? if it does exist, if it doesnt we add an empty js object {}.
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product){
      if(err){
        return res.redirect('/');
      }
      //add the item to the cart
      cart.add(product, product.id);
      //store the cart in the session.cart, the express.session saves the cart to DB automatic everytime we save something to session.
      req.session.cart = cart;
      //for dev purpose only
      console.log(req.session.cart);
      //redirect to product page
      res.redirect('/')
    });// end Product.find
  });//end add-to-cart

  router.get('/add-topping/:cartId/:toppingId', function(req, res, next){
    // get the cart id of the item to be added topping on, and the topping id to be added
    var cartId = req.params.cartId;
    var toppingId = req.params.toppingId
    //find the topping.
    Product.findById(toppingId, function(err, topping){
      if(err){
        return res.redirect('/');
      }
      //we create a new cart everytime the add button is pressed, and the old cart is inserted to the new cart. the old cart is already stored in the session req.session.cart ? if it does exist, if it doesnt we add an empty js object {}.
      var cart = new Cart(req.session.cart ? req.session.cart : {});
      //add the item to the cart
      cart.addTopping(cartId,topping);
      //store the cart in the session.cart, the express.session saves the cart to DB automatic everytime we save something to session.
      req.session.cart = cart;
      //redirect to shoppingCart page
      res.redirect('/shoppingCart/');
    }); // end Product.find
  }); // end add-topping

  router.get('/remove/:cartId', function (req, res){
    var cartId = req.params.cartId;
    //we create a new cart everytime the add buttonis pressed, and the old cart is inserted to the new cart. the old cart is already stored in the session req.session.cart ? if it does exist, if it doesnt we add an empty js object {}.
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    //add the item to the cart
    cart.remove(cartId);
    //store the cart in the session.cart, the express.session saves the cart to DB automatic everytime we save something to session.
    req.session.cart = cart;
    //redirect to shoppingCart page
    res.redirect('/shoppingCart/');
  });

  router.get('/remove/:cartId/:toppingId', function (req, res){
    var cartId = req.params.cartId;
    var toppingId = req.params.toppingId;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeTopping(cartId, toppingId);
    req.session.cart = cart;
    res.redirect('/shoppingCart/');
  })

router.get('/shoppingCart', middleware.indexIsLoggedIn, async(req, res) => {
  if(!req.session.cart){
    return res.render('shop/shoppingCart', {products: null});
  }
  let toppings = await Product.find({type: 'Topping'});
  var cart = new Cart(req.session.cart);
  res.render('shop/shoppingCart',{
    toppings: toppings,
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  })
});

//find os
router.get('/find',(req, res)=>{
  res.render('shop/find');
});

//bestilling
router.get('/bestilling',middleware.indexIsLoggedIn, async (req, res)=>{
  var cart = new Cart(req.session.cart);
  var user = req.user;
  let shopTime = await Shop.findOne({timeId: 1});
  res.render('shop/bestilling',{
    messages: req.flash('errors'),
    name: user.name,
    address: user.address,
    city: user.city,
    zip: user.zip,
    phone: user.phone,
    totalPrice: cart.totalPrice,
    products: cart.generateArray(),
    delTime: shopTime.deliveryTime,
    pickTime: shopTime.pickupTime
  });
});

//send bestilling til shoppen
router.post('/sendBestilling',middleware.indexIsLoggedIn, middleware.checkBestillingBody, async (req, res, next)=>{
  var cart = new Cart(req.session.cart);
  //if cash payment && asap && pickup
  if(req.body.cashOnline==='cash' && req.body.asapPick==='asap' && req.body.pickupDelivery==='pickup'){
    //get del/pickup time
    let shopTime = await Shop.find({timeId: 1});
    let shopPickupTime = shopTime[0].pickupTime;
    let dateTime = new Date(Date.now()+shopPickupTime);
    let address = req.body.inputAddress + req.body.inputZip + req.body.inputCity; console.log('address is '+address);
    let customerDetails = {
      name:req.body.inputName,
      address: req.body.inputAddress,
      zip: req.body.inputZip,
      city: req.body.inputCity,
      phone: req.body.inputPhone
    }
    geocode.geocodeAddress(address, (errorMessage, routeResults)=>{
      if(errorMessage){ //if errormessage from geocodeAddress
        req.flash('errors', errorMessage);
        res.redirect('/bestilling');
      }else{
        var route = routeResults;
        //save order to variable
        let orderTime = functions.getTime(shopPickupTime);
        let orderDate = functions.getDate(shopPickupTime);
        var order = new Order({
        user: req.user, //from passport
        cart,
        paymentType: req.body.inputStateBetaling,
        deliveryType: req.body.pickupDelivery,
        dateTime,
        delTime: orderTime,
        delDate: orderDate,
        processed: false,
        customerDetails
        });
        order.save((err, result)=>{
          if(err){
            console.log(err);
            res.redirect('some-thing-went-wrong',{
              errorMSG: 'Noget gik galt, prøv venligst igen, eller kontakt restaurenten'
            })//end res.redirect
          }//end if
          var id = order._id;
          //socket io stuff here send to OMS
          res.io.emit('newOrder', {
            id,
            totalPrice: order.cart.totalPrice,
            order,
            user: req.user,
            route,
            dateTime,
            delTime: orderTime,
            delDate: orderDate,
            customerDetails
          });//end res.io.emit
          res.redirect(`processing?id=${id}`);
        })//end order.save
      }//end else
    })//end geocodeAddress
  } //end if cash payment && asap && pickup
  else{
    res.render('shop/sendBestilling',{
      okay: 'Okay',
      tid: 1
    });
  }
});

router.get('/processing', middleware.indexIsLoggedIn, (req, res)=>{
  var order = req.query.id;
  res.render('shop/processing',{
    order
  })
});//end render processing

router.get('/accepted', middleware.indexIsLoggedIn, (req, res)=>{
  var id = req.query.id;
  res.render('shop/accepted',{
  })
})//end accepted

module.exports = router;
