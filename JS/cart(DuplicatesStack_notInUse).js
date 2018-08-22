//this cart is currently not in use. in this cart the duplicate items stack.
module.exports = function Cart(oldCart){
  //we insert to old cart to the function, || if there is no old cart, the oldCart object wil be created now.
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //adding a product to the cart
  this.add = function(item, id){
    //get the item id
    var storedItem = this.items[id];
    //dev purpose only
    console.log(storedItem);
    //for dev purpose only
    console.log(`item is ${item}`);
    //if the item is not already in cart
    if(!storedItem){
      storedItem = this.items[id] = {item: item, qty: 0, price: 0}
    }
    //if the item is already in cart the above step is skipped and we only increase qty and price.
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  }// end this.add

  this.reduceByOne = function(id){
    var itemToReduce = this.items[id];
    itemToReduce.qty--;
    itemToReduce.price -= itemToReduce.item.price * itemToReduce.qty;
    this.totalQty--;
    this.totalPrice -= itemToReduce.item.price;
    if(itemToReduce.qty<=0){
      delete this.items[id];
    }
  }

  this.deleteItem = function(id){
    var itemToDelete = this.items[id];
    this.totalQty -= itemToDelete.qty;
    this.totalPrice -= itemToDelete.item.price*itemToDelete.qty;
    itemToDelete.qty = 0;
    itemToDelete.price = 0;
    delete this.items[id];
  }

  //generate an array with the cart items, with the purpose og being able to list it
this.generateArray = function(){
  var arr = [];
  for(var id in this.items){
    arr.push(this.items[id]);
  };
  return arr;
  };
};//end cart
