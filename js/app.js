// Declare Variables

// Functions

// Event Listeners 
  function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        console.log(query);
        //clear out the input
        queryTarget.val("");
      });

  }


// Call Functions

$(watchSubmit);