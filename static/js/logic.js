// Store API endpoint
const queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Perform a GET request of the query URL
d3.json(queryURL).then(data => {

    // send data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function to run for each feature in the features array and create popup for each data point
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h2>" + feature.properties.place + "</h2> <hr> <h2>Magnitude: " + 
        (feature.properties.mag) + "</h2> <h2>Depth: " + feature.geometry.coordinates[2] + "</h2>");
    }

    // Create circle size based on size of quake
    function circleSize(magnitude) {
        return magnitude * 25000
    }

    // Define circle color based on depth of quake
    function circleColor(depth) {
        if (depth < 20) {
            return "green"
        }
        else if (depth < 30) {
            return "yellow"
        }
        else if (depth < 50) {
            return "orange"
        }
        else if (depth < 70) {
            return "red"
        }
        else {
            return "purple"
        }
    }

    // Create GeoJSON layer containing the features array
    // Run the onEachFeatures function for each data point in the array
    const earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: (earthquakeData, latlng) => {
          return new L.Circle(latlng, {
            radius: circleSize(earthquakeData.properties.mag),
            color: circleColor(earthquakeData.geometry.coordinates[2]),
            fillOpacity: .5
          });
        }
      });
    
    // Sending earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

// Create map
const myMap = L.map("map", {
    center: [15, -65],
    zoom: 3,
    layers: earthquakes
})

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Create legend
const legend = L.control({ position: "bottomright"});
legend.onAdd = function () {
    const div = L.DomUtil.create("div", "info legend");
    
}



}