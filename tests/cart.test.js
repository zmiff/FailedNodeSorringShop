const expect = require('expect');

const Cart = require('./../JS/cart');

let item = {
  title: 'itemtitle',
  description: 'itemdescription',
  type: 'itemtype',
  price: 10,
  largePrice: 15
}
let item2 = {
  title: 'item2title',
  description: 'item2description',
  type: 'item2type',
  price: 10,
  largePrice: 15
}
let topping1 = {
  title: 'toppingtitle',
  description: 'toppingdescription',
  type: 'toppingtype',
  price: 1,
  largePrice: 2
}

describe('Cart',()=>{
  it('should create an empty cart',()=>{
    let cart = new Cart({})
    expect(cart.generateArray()).toHaveLength(0)
    expect(cart.totalQty).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('should add an item to an empty cart',()=>{
    let cart = new Cart({})
    cart.add(item,1)
    expect(cart.generateArray()).toHaveLength(1)
    expect(cart.totalQty).toBe(1)
    expect(cart.totalPrice).toBe(10)
  });

  it('should add an item to a loaded cart',()=>{
    let cart = new Cart({})
    cart.add(item,1)
    let newCart = new Cart(cart)
    newCart.add(item2,1)
    expect(newCart.generateArray()).toHaveLength(2)
    expect(newCart.totalQty).toBe(2)
    expect(newCart.totalPrice).toBe(20)
  });

  it('should remove an item from a cart with 2 items',()=>{
    let cart = new Cart({})
    cart.add(item,1)
    cart.add(item2,2)
    cart.remove(0)
    let cartArr = cart.generateArray()
    expect(cartArr).toHaveLength(1)
    expect(cart.totalQty).toBe(1)
    expect(cart.totalPrice).toBe(10)
    expect(cartArr[0].item.title).toBe('item2title')
  });

  it('should add a topping to a item',()=>{
    let cart = new Cart({})
    cart.add(item,1)
    cart.addTopping(0, topping1)
    expect(cart.totalQty).toBe(1)
    expect(cart.totalPrice).toBe(11)
    expect(cart.items[0].toppings[0].title).toBe('toppingtitle')
  });

  it('should remove a topping',()=>{
    let cart = new Cart({})
    cart.add(item,1)
    cart.addTopping(0, topping1)
    expect(cart.totalQty).toBe(1)
    cart.removeTopping(0,0)
    expect(cart.totalPrice).toBe(10)
    expect(cart.items[0].toppings[0]).toBe(undefined)
  });


});
