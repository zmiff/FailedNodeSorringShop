var socket = io.connect();
socket.on('newOrder', function(data){
  $items = [];

  for(var i in data.order.cart.items){
    $items.push(data.order.cart.items[i]);
  };
  str = `<ul class="list-group">`
  $.each($items, function(index, value){
    if($items.toppings!=={}){
      str+= `<li class="list-group-item">${value.item.title}<span class="float-right">${value.item.price} kr</span>`
      for(var nr in this.toppings){
        str+= `<p class="OMS-toppingsP">+${this.toppings[nr].title}</p>`
      }//end for
    }//end if toppings
    else{
      str+= `<li class="list-group-item">${value.item.title}<span class="float-right">${value.item.price} kr</span>`
    }
  });
  str+=`</li><li class="list-group-item"><p>Afstand til kunde: <span class="float-right">${data.route.distance.text} ${data.route.duration.text}</span></p></li>`
  str+=`<li class="list-group-item"><p class="font-weight-bold">Total: <span class="float-right">${data.totalPrice} kr</span></p></li>`
  str+=`<li class="list-group-item">${data.customerDetails.name}<br>${data.customerDetails.address}<br>${data.customerDetails.zip} ${data.customerDetails.city}<br>${data.customerDetails.phone}</li>`
  str+=`<li class="list-group-item">Bestilt til: ${data.delTime} ${data.delDate} </li>`
  str+=`<form action="/oms/monitor" method="post">`;
  str+=`<input name='orderId' value='${data.id}' hidden />`;
  str+=`<input name="btnAcceptOrder" id="btnAcceptOrder${data.id}" type="submit" class="btn btn-success" value="Accepter"/> <input name="btnDeclineOrder" id="btnDeclineOrder${data.id}" type="submit" class="btn btn-danger btnDecline" value="Afvis"/>`;
  str+="</form></ul><hr>"

  $('#omsMonitorDiv').append(str);
});
