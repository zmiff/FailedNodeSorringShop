let getTime = (shopTime) => {
  let d = new Date(Date.now()+shopTime);
  let mins = d.getMinutes();
  if(mins<10){
    mins= '0'+mins;
  }
  let hours = d.getHours();

  return (`${hours}:${mins}`);
};

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
}

module.exports = {
    getTime, getDate
}
