
//Goals
//  - Center map on first result. Add markers for all results

//Declare Variables 
let map;


//Functions
function retrieveSearchData() {
  let retrievedStringResults = localStorage.getItem('results');
  let data = JSON.parse(retrievedStringResults);
  let coordinates = populateCordinatesArray(data);
  const results = data.map(item => {
    return displaySearchResults(item);
  });
  $('.display-results').html(results);
  initMap(coordinates);
}

function populateCordinatesArray(data) {
  let coordinates = [];
  data.map(item => {
    coordinates.push({
      name: item.name,
      lat: item.location.lat,
      lng: item.location.lng
    });
  });
  return coordinates;
}

function retreiveQueryValue() {
  let query = localStorage.getItem('query');
  $('.searched-query').html(query);
}

function displaySearchResults(result) {
  return `
  <h3 class="result-name">${result.name}</h3>
  <p class="result-address">${result.location.formattedAddress}</p>
  `;
}

function initMap(coordinates) {

  let geocoder = new google.maps.Geocoder();
  var address = localStorage.getItem('query');

  geocoder.geocode({'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 10
      });
      coordinates.map(item => {
        let marker = new google.maps.Marker({
          position: {lat: item.lat , lng: item.lng},
          title: item.name,
          animation: google.maps.Animation.DROP,
          map: map
        });
      });        
      console.log("FOUND");
      console.log("Lat is " + lat + " and long is " + lng);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
      // map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: coordinates[0].lat, lng: coordinates[0].lng},
      // zoom: 12
      }
  });
}

//Call Functions
$(function () {
  retrieveSearchData();
  retreiveQueryValue();
})