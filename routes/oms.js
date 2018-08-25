const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const functions = require('./../JS/functions');

router.get('/monitor', async(req, res)=>{
  let today = functions.getDate(0)
  let pendingOrders = await Order.find({processed: 'false',delDate: today});
  if(pendingOrders.length>0){
    res.render('oms/monitor',{
      pendingOrders: pendingOrders
    });
  }else{
    res.render('oms/monitor',{})
  }
});

router.post('/monitor', async (req, res)=>{
  let id = req.body.orderId;
  if(req.body.btnAcceptOrder === 'Accepter'){
    console.log(`order: ${req.body.orderId} is accepted`)
      //find order and update processed and status
      try{
        let order = await Order.findOne({_id: id}).exec();
        order.processed = true
        order.status = 'accepted'
        order.save()
        //socket emit order status
        res.io.emit(`Accepted${id}`,{
          
        })
      }
      catch(error){
        console.log(error)
      }

  }
  else if(req.body.btnDeclineOrder === 'Afvis') {
    console.log(`order: ${req.body.orderId} is declined`)
  }
  else{
    //handle
  }
  res.redirect('monitor');


})
module.exports = router;
