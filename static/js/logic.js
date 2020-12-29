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

  // Add data
var dummyData = [
    {
        name: "Brazil",
        location: [-14.2350, -51.9253],
        points: 227
      },
      {
        name: "Germany",
        location: [51.1657, 10.4515],
        points: 218
      },
      {
        name: "Italy",
        location: [41.8719, 12.5675],
        points: 156
      },
      {
        name: "Argentina",
        location: [-38.4161, -63.6167],
        points: 140
      },
      {
        name: "Spain",
        location: [40.4637, -3.7492],
        points: 99
      },
      {
        name: "England",
        location: [52.355, 1.1743],
        points: 98
      },
      {
        name: "France",
        location: [46.2276, 2.2137],
        points: 96
      },
      {
        name: "Netherlands",
        location: [52.1326, 5.2913],
        points: 93
      },
      {
        name: "Uruguay",
        location: [-32.4228, -55.7658],
        points: 72
      },
      {
        name: "Sweden",
        location: [60.1282, 18.6435],
        points: 61
      }
    ];


// Loop through the data array
dummyData.forEach(country => {
    // Add circles to map
    L.circle(country.location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: whatColorShouldIBe(country.points),
        // Adjust radius
        radius: country.points * 1500
    }).bindPopup(setMyText(country)).addTo(myMap);
  });
  function setMyText(country = {}) {
    var text;
    text = `<h1>  ${country.name} </h1> <hr> <h3>Points: ${country.points} </h3><h4>made with function</h4>`;
    return text;
  }
  function whatColorShouldIBe(points = 0) {
    var color = "";
    if (points > 200) {
        color = "yellow";
    } else if (points > 100) {
        color = "blue";
    } else if (points > 90) {
        color = "green";
    } else {
        color = "red";
    }
    return color;
  }