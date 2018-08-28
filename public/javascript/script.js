$(document).ready(function(){
  //monitor.hbs change print extend time
    $('.inputStateExtend').on('change', function(){
      if($(this).val()==0){
        $(this).parent().next().removeClass('onlyprint').addClass('noprint')
        $(this).parent().next().text('')
      }else{
        $(this).parent().next().removeClass('noprint').addClass('onlyprint')
        $(this).parent().next().text('Forlænget med: '+$(this).val()+' minutter')
      }

    });

  //Hide show timepicker
  $("#inputStateLevering").change(function(){
      if($("#inputStateLevering").val() === "Afhentning vælg tidspunkt" || $("#inputStateLevering").val() === "Udbringnig vælg tidspunkt +30 kr"){
        $('#timePicker').slideDown();
        $('#asapPick').val('pick');
      }
      else if($("#inputStateLevering").val() === "Udbringning hurtigst muligt +30 kr" || $("#inputStateLevering").val() === "Afhentning hurtigs muligt"){
        $('#timePicker').slideUp();
        $('#asapPick').val('asap');
      }
  });
  //end hide show timepicker

  //change bestil/betal knappe
  $("#inputStateBetaling").change(function(){
    if($("#inputStateBetaling").val() === "Online med kort"){
      $('#btnSend').animate({'opacity': 0}, 100, function () {
        $(this).val('Til betaling');
      }).animate({'opacity': 1}, 300);
      $('#cashOnline').val('online');
    }
    else if($("#inputStateBetaling").val() === "Ved levering/afhentning (kontant eller mobilepay)"){
      $('#btnSend').animate({'opacity': 0}, 100, function () {
        $(this).val('Send ordre');
      }).animate({'opacity': 1}, 300);
      $('#cashOnline').val('cash');
    }
  });
  //end change bestil/betal knappe

  //change levering/afhentning value
  $("#inputStateLevering").change(function(){
      if($("#inputStateLevering").val() === "Afhentning vælg tidspunkt" || $("#inputStateLevering").val() === "Afhentning hurtigs muligt"){
        $('#pickupDelivery').val('pickup');
      }
      else if($("#inputStateLevering").val() === "Udbringning hurtigst muligt +30 kr" || $("#inputStateLevering").val() === "Udbringnig vælg tidspunkt +30 kr"){
        $('#pickupDelivery').val('delivery');
      }
  });//end levering/afhentning value


//date- & timepicker & order time stuff
if(deliveryTime){
  let d = new Date();
  let dDel = new Date(Date.now()+deliveryTime); //delTime & pickTime from bestilling.hbs script
  let dPick = new Date(Date.now()+pickupTime);  //delTime & pickTime from bestilling.hbs script
  let minsDel = dDel.getMinutes();
  let hoursDel = dDel.getHours();
  let minsPick = dPick.getMinutes();
  let hoursPick = dPick.getHours();
  var day = d.getDate();
  let weekDay = '';
  switch (d.getDay()) {
    case 0:
        weekDay = "Søndag";
        break;
    case 1:
        weekDay = "Mandag";
        break;
    case 2:
        weekDay = "Tirsdag";
        break;
    case 3:
        weekDay = "Onsdag";
        break;
    case 4:
        weekDay = "Torsdag";
        break;
    case 5:
        weekDay = "Fredag";
        break;
    case 6:
        weekDay = "Lørdag";
    }//end switch
  //for timepicker
  let month = d.getMonth()+1;
  var year = d.getFullYear();
  var H = d.getHours();
  var m = d.getMinutes();
  var HH = dDel.getHours();
  var mm = dDel.getMinutes();
  var delTime = HH+':'+mm;
  var startTime = 16+':'+00;
  var maxTime = 21+':'+00;
  if(delTime>startTime){
      startTime = delTime;
  }
  if(delTime>21+':'+00){
    $('#inputStateTidspunkt').val('Butikken har desværre lukket for selvvalgt tid for idag.');
    $('#inputStateTidspunkt').prop('disabled', 'disabled');
    $("#inputStateLevering").change(function(){
        if($("#inputStateLevering").val() === "Afhentning vælg tidspunkt" || $("#inputStateLevering").val() === "Udbringnig vælg tidspunkt +30 kr"){
          $('#btnSend').fadeOut();
        }
        else if($("#inputStateLevering").val() === "Udbringning hurtigst muligt +30 kr" || $("#inputStateLevering").val() === "Afhentning hurtigs muligt"){
          $('#btnSend').fadeIn();
        }
    });
    }

  $('#inputStateTidspunkt').timepicker({
    minTime: startTime,
    maxTime: '21:00',
    interval: 15,
    timeFormat: 'HH:mm'
  });
    /* ikke i brug.
  $('#inputStateDato').val(d);
  $( "#inputStateDato" ).datepicker({
    minDate: 0,
    maxDate: 30
  });
  */
  //end date- & timepicker

}//end if deltime != undefined

});//end document ready
