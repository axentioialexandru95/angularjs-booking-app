var iasi = {lat: 47.156116, lng: 27.5169311};

// Instantiates the Gmaps Map
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8,
  center: iasi
});


// Instantiates bounds

var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(47.1690611, 27.6199462),
  new google.maps.LatLng(45.6542889, 20.9462472)
);
//
// Options
var options = {
  bounds: defaultBounds
};

var pickup = document.getElementById('pickup');
var dropoff = document.getElementById('dropoff');

var searchBox = new google.maps.places.SearchBox(pickup);
var searchBox2 = new google.maps.places.SearchBox(dropoff);


map.addListener('bounds_changed', function () {
  searchBox.setBounds(map.getBounds());
  searchBox2.setBounds(map.getBounds());
});


var markers = [];

searchBox2.addListener('places_changed', function () {
  var places = searchBox2.getPlaces();

  if (places.length == 0) {
    return;
  }

  markers = [];

  var bounds = new google.maps.LatLngBounds();

  places.forEach(function (place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

searchBox.addListener('places_changed', function () {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  // markers.forEach(function (marker) {
  //   marker.setMap(null);
  // });
  markers = [];

  var bounds = new google.maps.LatLngBounds();
  places.forEach(function (place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});


directionsDisplay.setMap(map);

document.getElementById('dropoff').addListener('places_changed', function () {
  calculateAndDisplayRoute(directionsService, directionsDisplay);
});

}
setTimeout(function(){
  initMap();
}, 2000);

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true
      });
    }
  }

  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
