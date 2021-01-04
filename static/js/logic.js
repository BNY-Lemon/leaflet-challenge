const dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // Loop through the real data array
d3.json(dataUrl, function(data) {
  // console.log(data);
  data.features.forEach(function(element, i) {
    // console.log('Element', i, 'is', element);
    let quakeId = element.id;
    let location = [element.geometry.coordinates[1], element.geometry.coordinates[0]];
    let depth = element.geometry.coordinates[2];
    let magnitude = element.properties.mag;
    let place = element.properties.place;
    let time = new Date(element.properties.time);
      // Add circles to map
    L.circle(location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: getColor(depth),
        // Adjust radius
        radius: magnitude * 30000
    }).bindPopup(setMyText()).addTo(myMap);

    function setMyText() {
      var text = {};
      text = `<h1>  ${place} </h1> <hr> 
        <h3>ID: ${quakeId} </h3>
        <h3>Time: ${time} </h3>
        <h3>Magnitude: ${magnitude} </h3>
        <h3>Depth: ${depth} </h3>
        <h4>made with function</h4>`;
      return text;
    }
  });
  // Build legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "info legend"),
        grades = [-10, 10, 30, 50, 70, 90],
        labels = [];
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    return div;
  };
  // Adding legend to the map
  legend.addTo(myMap);
});

function getColor(depth = 0) {
  return depth > 90 ? 'red' :
          depth > 70 ? 'darkorange' :
          depth > 50 ? 'orange' :
          depth > 30 ? 'yellow' :
          depth > 20 ? 'light green':
          depth > 10 ? 'green':
                        'darkgreen';
}