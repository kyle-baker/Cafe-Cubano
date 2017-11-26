// Declare Variables
const FOURSQUARE_SEARCH_URL = 'https://api.foursquare.com/v2/venues/search'

// Functions

function getDataFromFourSquareApi(searchTerm, callback) {
  const settings = {
    url: FOURSQUARE_SEARCH_URL,
    data: {
      near: `${searchTerm}`,
      intent: 'checkin',
      radius: '33000',
      query: 'cuban coffee',
      limit: '10',
      client_id: '55QXXTGF1UEKWJ4MPLWRLOXNKMB1RBA5WXOBGYYXW1Q0YDOW',
      client_secret: 'NUHCGKZ0B50OWEP5X3JX2EFZMFPDBHX53MKOBANIH5MLZKLW',
      v: '20171124'
      },
    success: callback,
    type: 'GET',
  };

  $.ajax(settings);
}


function storeSearchData(data) {
  const resultsAsString = JSON.stringify(data.response.venues);
  localStorage.setItem('results', resultsAsString);
  window.location.href="results.html";
}


// Event Listeners 
  function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        //Store query to display on results page
        const queryAsString = JSON.stringify(query);
        localStorage.setItem('query', queryAsString);
        //clear out the input
        queryTarget.val("");
        getDataFromFourSquareApi(query, storeSearchData);
      });

  }


// Call Functions
$(watchSubmit);