const fetch = require("node-fetch");

const getLocation = async address => {
  const origins = 'hovedgaden 8 sorring';
  const encodedAddress = encodeURIComponent(address);
  const key = 'AIzaSyBWj7fPMDX2SbsPOBU7Ae7tofoJgZ_ryNU';
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${encodedAddress}&language=dk-DK&key=${key}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const result = json.rows[0].elements[0];
    if(result.status==='NOT_FOUND'){
      return 'NOT FOUND';
    }
    else if(result.status==='OK' && result.status!=='NOT_FOUND'){
      return  result
    }
    else{
      result.distance.text = 'n/a'
      result.duration.text = 'n/a'
    }

  } catch (error) {
    throw new Error('something bad happened');
  }
};

module.exports = {
    getLocation
}

/*
//old callback geocode
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
*/
module.exports = {
    getLocation
}
