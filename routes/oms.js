const express = require('express');
const router = express.Router();

router.get('/monitor',(req, res)=>{
  res.render('oms/monitor');
});

router.post('/monitor', (req, res)=>{
  console.log(`order is ${req.body.status}`);
  let status = req.body.status;
  let orderId = req.body.orderId;
  if(status==='declined'){
    console.log('declined');
    res.io.emit(`declined${orderId}`, {
      status: 'declined'
    });//end res.io.emit
  }
  //find order and update processed
  res.render('oms/monitor');


})
module.exports = router;
