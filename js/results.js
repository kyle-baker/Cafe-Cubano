//Declare Variables 
let map;
let markerLabels = 'ABCDEFGHIJ';
let currentMarker = 0;
//Functions
function retrieveSearchData() {
  let retrievedStringResults = localStorage.getItem('results');
  let data = JSON.parse(retrievedStringResults);
  const results = data.map(item => {
    item.markerLabel = markerLabels[currentMarker]
    currentMarker++;
    return displaySearchResults(item);
  });
  $('.display-results').prop('hidden', false);
  $('.display-results').html(results);
  let coordinates = populateCordinatesArray(data);
  retreiveQueryValue();
  initMap(coordinates);
}

function populateCordinatesArray(data) {
  let coordinates = [];
  data.map(item => {
    coordinates.push({
      lat: item.location.lat,
      lng: item.location.lng,
      label: item.markerLabel
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
    <div class="result-display">
    <h3 class="result-name"><span class="marker-label">${result.markerLabel}</span> - ${result.name}</h3>
    <p class="result-address">${result.location.formattedAddress}</p>
    </div>
    `;
}

function initMap(coordinates) {

  let geocoder = new google.maps.Geocoder();
  let address = localStorage.getItem('query');

  geocoder.geocode({'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      drawMap(lat, lng, coordinates);

    } else {
        drawMap(coordinates[0].lat, coordinates[0].lng, coordinates);
      };
  });
}

function drawMap(lat, lng, coordinates) {
 map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 10
      });
      coordinates.map(item => {
        let marker = new google.maps.Marker({
          position: {lat: item.lat , lng: item.lng},
          animation: google.maps.Animation.DROP,
          map: map,
          label: item.label
        });
      });        
}     

//Call Functions
$(function () {
  retrieveSearchData();
});