
function retrieveSearchData() {
  let retrievedStringResults = localStorage.getItem('results');
  let data = JSON.parse(retrievedStringResults);
  const results = data.map(item => {
    return displaySearchResults(item);
  });
  $('.display-results').html(results);
}

function displaySearchResults(result) {
  return `
  <h3>${result.name}</h3>
  <p>${result.location.formattedAddress}</p>
  `;
}

$(function () {
  retrieveSearchData();
})