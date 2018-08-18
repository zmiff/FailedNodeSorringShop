var request = require('request');

var geocodeAddress = (address, callback) => {
  var origins = 'hovedgaden 8 sorring';
  var encodedAddress = encodeURIComponent(address);
  var key = 'AIzaSyBWj7fPMDX2SbsPOBU7Ae7tofoJgZ_ryNU';
  request({
    url :`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${encodedAddress}&language=dk-DK&key=${key}`,
    json: true
  },(error, response, body) => {
    if(error){
      callback('unable to connect to google servers.');
    }//else if(body.status==='ZERO_RESULTS'){
      else if(body.rows[0].elements[0].status==='NOT_FOUND'){
      callback('kunne ikke finde den adresse, indtast venligst en gyldig adresse!')
    }else if(body.status==='OK' && body.rows[0].elements[0].status!=='NOT_FOUND'){
      callback(undefined, {
          distance: body.rows[0].elements[0].distance.text,
          duration: body.rows[0].elements[0].duration.text
      });
    }
    else{
      callback({
        body: body,
        destination: body.destination_address,
        origin: response.body.origin_address,
        statusCode: response.statusCode
      })
    }
  })
}//end geocode

let getTime = (shopTime) => {
  let d = new Date(Date.now()+shopTime);
  let mins = d.getMinutes();
  if(mins<10){
    mins= '0'+mins;
  }
  let hours = d.getHours();

  return (`${hours}:${mins}`);
};//end getTime

let getDate = (shopTime)=>{
  let d = new Date(Date.now()+shopTime);
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
  let month = d.getMonth()+1;
  let year = d.getFullYear();

  return(`${weekDay} d.${day}-${month}-${year}`)
}//end getDate

module.exports = {
    getTime, getDate, geocodeAddress
}
