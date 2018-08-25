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
  let extendTime = req.body.inputStateForlæng*60000
  console.log('forlæng in ms is: ',extendTime)
  if(req.body.btnAcceptOrder === 'Accepter'){
      //find order and update processed and status
      try{
        let order = await Order.findOne({_id: id}).exec();
        convertTime = new Date(order.delDateTime).getTime();
        console.log(`convertTime is: ${convertTime}`)
        order.delDateTime = convertTime + extendTime;
        console.log(`delDatTime is: ${order.delDateTime}`)
        order.delTime = functions.getTime(order.delDateTime)
        order.delDate = functions.getDate(order.delDateTime)
        console.log(`delTime is: ${order.delTime}`)
        console.log(`delDate is: ${order.delDate}`)
        order.processed = true;
        order.status = 'accepted';
        console.log(order.status)
        order.save();
        //socket emit order status
        res.io.emit(`Accepted${id}`,{
          time: order.delTime,
          date: order.delDate
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
