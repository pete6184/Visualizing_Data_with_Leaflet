// Store API endpoint
const queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Perform a GET request of the query URL
d3.json(queryURL).then(data => {
    console.log(data);
    console.log(d3.extent(data.features.map(d => d.properties.mag)));

    // send data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function to run for each feature in the features array and create popup for each data point
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h2>" + feature.properties.place + "</h2> <hr> <h3>Magnitude: " + 
        (feature.properties.mag) + "</h3> <hr> <h3>Depth: " + feature.geometry.coordinates[2] + "</h3>");
    }

    // Create circle size based on size of quake
    function circleSize(magnitude) {
        return magnitude * 15000
    }

    // Define circle color based on depth of quake
    function circleColor(depth) {

    }



    // Create GeoJSON layer containing the features array
    // Run the onEachFeatures function for each data point in the array
    const earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
    });

    const mags = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: (feature, latlng) => {
          return new L.Circle(latlng, {
            radius: feature.properties.mag*25000,
            fillColor: "red",
            stroke: false 
          });
        }
      });
    
    // Sending earthquakes layer to the createMap function
    createMap(earthquakes, mags);
}

function createMap(earthquakes, mags) {



}
