// in this cart duplicate items does not stack.
module.exports = function Cart(oldCart){
  //we insert to old cart to the function, || if there is no old cart, the oldCart object wil be created now.
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //adding a product to the cart
  this.add = function(item, id){
    //get the amount of items in cart and set cartId equal to interval
    nr = this.totalQty;
    //dev purpose only
    console.log(`nr is ${nr}`);
    //for dev purpose only
    console.log(`item is ${item}`);
    //create the item in the items array
    storedItem = this.items[nr] = {cartId:nr, id: id, item: item, qty: 1}
    //dev purpose only
    console.log(`stored item is ${storedItem}`);
    //set item price and update cart total price
    storedItem.price = storedItem.item.price
    this.totalPrice += storedItem.item.price;
    //increase total quanitity of items in cart
    this.totalQty++;
  }// end this.add

  //adding a topping to a cart item
  this.addTopping = function(cartId, topping){
    //find the item to be removed in cart
    storedItem = this.items[cartId];
    if(!storedItem.toppings){
      storedItem.toppings = {};
      cartTopId = 0;
    }
    //add the topping
    storedItem.toppings[cartTopId] = {id: cartTopId, title: topping.title, price: topping.price, largePrice: topping.largePrice};
    //increase the cart total price by topping price.
    this.totalPrice += storedItem.toppings[cartTopId].price;
    cartTopId++;
  }//end add topping

  //removing product from cart
  this.remove = function(cartId){
    //find the item to be removed in cart
    storedItem = this.items[cartId];
    //reduce cart total price
    this.totalPrice -= storedItem.item.price;
    //decrease total quanitity of items in cart
    this.totalQty--;
    //remove the item located at nr cartId, remove 1.
    delete this.items[cartId];
  }// end this.remove

  //removing topping from cart item
  this.removeTopping = function(cartId, toppingId){
    //store the topping to be removed in var
    storedItem = this.items[cartId].toppings[toppingId];
    //decrease the total cart price by topping price
    this.totalPrice -= storedItem.price;
    //delete the topping
    delete this.items[cartId].toppings[toppingId];
  }

  //generate an array with the cart items, with the purpose og being able to list it
this.generateArray = function(){
  var arr = [];
  for(var nr in this.items){
    arr.push(this.items[nr]);
  };
  return arr;
  };
};//end cart
