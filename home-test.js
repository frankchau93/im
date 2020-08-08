  var data = {};
  var street_address = '';
  var city = '';
  var state = '';
  var zip_code = '';
  var housedetails = {};
  var errormsg = document.getElementById('error-msg');
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function humanize(str) {
    var i,
      frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
  function getCurrAddress() {
    if (!street_address || !city || !state || !zip_code) {
      return;
    }
    
    var postURL = `https://apis.estated.com/v4/property?token=wJfCcOLbvu8tXyNh5SzR85DX37xeJv&street_address=${street_address}&city=${city}&state=${state}&zip_code=${zip_code}`;
    $.get(postURL, function (data, textStatus) {
      // success
      console.log(data, textStatus);
      let results = data.data;
      if(results){
        $('.fulladdress').text(
        `${results.address.formatted_street_address} ${results.address.city}, ${results.address.state} ${results.address.zip_code}`
      );
      $('.amount').text(`$${numberWithCommas(results.valuation.value)}`);
      $('.lowrange').text(`$${numberWithCommas(results.valuation.low)}`);
      $('.highrange').text(`$${numberWithCommas(results.valuation.high)}`);
      $('.bedrooms').text(
        `${results.structure.beds_count ? results.structure.beds_count : 'N/A'}`
      );
      $('.bathrooms').text(
        `${results.structure.baths ? results.structure.baths : 'N/A'}`
      );
      $('.totalsize').text(
        `${
          results.structure.total_area_sq_ft
            ? results.structure.total_area_sq_ft
            : 'N/A'
        }`
      );
      $('.bathrooms').text(
        `${results.structure.baths ? results.structure.baths : 'N/A'}`
      );
      $('.yearbuilt').text(
        `${results.structure.year_built ? results.structure.year_built : 'N/A'}`
      );
      $('.airconditioning').text(
        `${
          results.structure.air_conditioning_type
            ? results.structure.air_conditioning_type
            : 'N/A'
        }`
      );
      $('.heater').text(
        `${
          results.structure.heating_type
            ? results.structure.heating_type
            : 'N/A'
        }`
      );
      housedetails = Object.assign(results.parcel, results.structure);
      var inHTML = '';

      $.each(housedetails, function (index, value) {
        if (value && value.length > 0) {
          if (typeof value == 'object') {
            $.each(value, function (idx, val) {
              if (typeof val == 'object') {
                var newItem = '';
                if (
                  index == 'other_areas' ||
                  index == 'other_features' ||
                  index == 'other_improvements'
                ) {
                  newItem =
                    "<li class='w-col w-col-6'><div class='detail-title'>" +
                    humanize(val.type) +
                    "</div><span class='housedetaillist'>SQ FT:" +
                    val.sq_ft ? val.sq_ft : 'N/A' +
                    '</span></li>';
                } else {
                  newItem =
                    "<li class='w-col w-col-6'><div class='detail-title'>" +
                    humanize(idx) +
                    "</div><span class='housedetaillist'>" +
                    val.join() +
                    '</span></li>';
                }
                inHTML += newItem;
              } else {
                var newItem =
                  "<li class='w-col w-col-6'><div class='detail-title'>" +
                  humanize(index) +
                  "</div><span class='housedetaillist'>" +
                  val.idx ? val.idx : 'N/A' +
                  '</span></li>';
                inHTML += newItem;
              }
            });
            
          } else {
            var newItem =
              "<li class='w-col w-col-6'><div class='detail-title'>" +
              humanize(index) +
              "</div><span class='housedetaillist'>" +
              value +
              '</span></li>';
            inHTML += newItem;
          }
        }
      });

      $('#housedetails').html(inHTML);
          $('#results').fadeOut();
        $('#propdetails').fadeIn();
      }else {
        $('#results').fadeOut();
        errormsg.style.display = 'block';
        $('#autocomplete').addClass('has-error');
      }
      
    
    }).fail(function () {
      $('#results').fadeOut();
        errormsg.style.display = 'block';
        $('#autocomplete').addClass('has-error');
    });
  }
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    });
    var resultsmap = new google.maps.Map(document.getElementById('map2'), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('autocomplete');

    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');
    var options = {
      types: ['geocode'], // or '(cities)' if that's what you want?
      componentRestrictions: { country: 'us' },
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
    autocomplete.bindTo('bounds', resultsmap);
    autocomplete.setTypes(['address']);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(['address_components', 'geometry', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    var marker2 = new google.maps.Marker({
      map: resultsmap,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', function () {
      $('#results').slideUp();
      errormsg.style.display = 'none';
      $('#autocomplete').removeClass('has-error');
      infowindow.close();
      marker.setVisible(false);
      marker2.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        resultsmap.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
        resultsmap.setCenter(place.geometry.location);
        resultsmap.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      marker2.setPosition(place.geometry.location);
      marker2.setVisible(true);
      var address = '';
      var bottomAddress = '';

      if (place.address_components) {
        street_address = `${extractFromAddress(
          place.address_components,
          'street_number'
        )} ${extractFromAddress(place.address_components, 'route')}`;
        city = `${extractFromAddress(place.address_components, 'locality')}`;
        state = `${extractFromAddress(
          place.address_components,
          'administrative_area_level_1'
        )}`;
        zip_code = `${extractFromAddress(
          place.address_components,
          'postal_code'
        )}`;

        $('.street_address').text(street_address);
        $('.city').text(city);
        $('.state').text(state);
        $('.zip_code').text(zip_code);

        bottomAddress = [
          (place.address_components[3] &&
            place.address_components[3].short_name) ||
            '',
          ',',
          (place.address_components[5] &&
            place.address_components[5].short_name) ||
            '',
          (place.address_components[7] &&
            place.address_components[7].short_name) ||
            '',
        ].join(' ');

        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            '',
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            '',
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            '',
        ].join(' ');

        $('#results').slideDown('slow', 'linear', function () {
          // Animation complete.
          //$('.results-container').fadeIn();
          //$(this).height('auto');
        });
      }

      /*infowindowContent.children['place-icon'].src = place.icon;
              infowindowContent.children['place-name'].textContent = place.name;
              infowindowContent.children['place-address'].textContent = address;
              infowindow.open(map, marker);*/
    });
  }
  function extractFromAddress(components, type) {
    return (
      components
        .filter((component) => component.types.indexOf(type) === 0)
        .map((item) => item.long_name)
        .pop() || null
    );
  }
  window.onload = (event) => {
    // variables
    var isFormValid = false;

    // elements
    var homeValue = document.getElementById('autocomplete');

    // START

    runFormCode();

    function runFormCode() {
      // save 'enabled' submit button color for later
      var originalSubmitButtonColor = submitButton.style.backgroundColor;
      var submitButtonDisabledColor = 'grey';

      setInterval(function () {
        // Keep submit button in sync with input values
        updateSubmitButtonState();
      }, 250);

      function updateSubmitButtonState() {
        isFormValid = homeValue.validity.valid;

        submitButton.style.backgroundColor = isFormValid
          ? originalSubmitButtonColor
          : submitButtonDisabledColor;
      }

      $('#getCurrAddress').click(function () {
        getCurrAddress();
      });
    }
  };
