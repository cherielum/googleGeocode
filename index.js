//call Geocode
//geocode();

//get location form
var locationForm = document.getElementById('location-form');

//list for submit
locationForm.addEventListener('submit', geocode);

function geocode(e) {
  //prevent actual submit
  e.preventDefault();

  var location = document.getElementById('location-input').value; 
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key:'AIzaSyD3NSv29npxID24AWsQhVEuQpm1sDYwTLs'
    }
  })
  .then(function(response){
    //log full response
    console.log(response);

    //formatted address
    var formattedAddress = response.data.results[0].formatted_address;
    var formattedAddressOutput =`
      <ul class = "list-group">
        <li class = "list-group-item"> ${formattedAddress} </li>
      </ul>
      ` ;

      //address components
      var addressComponents = response.data.results[0].address_components;
      var addressComponentsOutput = '<ul class = "list-group">';

      for(var i = 0; i< addressComponents.length; i++) {
        addressComponentsOutput += `
        <li class = "list-group-item"><strong>${addressComponents[i].types[0]}</strong>:${addressComponents[i].long_name}</li>
        `;
      };
      addressComponentsOutput+= '</ul>';

      //geometry address
      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      var geometryOutput = `
        <ul class = "list-group">
          <li class = "list-group-item"> <strong>Latitude</strong>:${lat} </li>
          <li class = "list-group-item"> <strong>Longitude</strong>:${lng} </li>
        </ul>
        ` ;

      //Output to app
      document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
      document.getElementById('address-components').innerHTML = addressComponentsOutput;
      document.getElementById('geometry').innerHTML = geometryOutput;

  })
  .catch(function(error){
    console.log(error);
  });
}
