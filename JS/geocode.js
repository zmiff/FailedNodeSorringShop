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
}

/*
request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=kildeagervej%20241+hasselager&destinations=|hovedgaden+sorring&language=dk-DK&key=AIzaSyBWj7fPMDX2SbsPOBU7Ae7tofoJgZ_ryNU', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var newBody = JSON.parse(body);
  newBody = newBody.rows[0].elements[0]
  console.log('distance:', newBody.distance.text); // Print the HTML for the Google homepage.
  console.log('duration:', newBody.duration.text);
});
*/
module.exports = {
    geocodeAddress
}
