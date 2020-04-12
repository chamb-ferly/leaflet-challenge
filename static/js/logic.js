// Load in GeoJson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(geoData, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        magMarkers = []
        // Magnitude color scale conditionals
        for (var i = 0; i < feature.length; i++) {
            var color = "";
            if (feature[i].properties.mag < 2.5) {
                color = "#3bb828";
            }
            else if (feature[i].properties.mag < 5.4) {
                color = "#b4f03c";
            }
            else if (feature[i].properties.mag < 6) {
                color = "#ffe436";
            }
            else if (feature[i].properties.mag < 6.9) {
                color = "#e67b10";
            }
            else if (feature[i].properties.mag < 7.9) {
                color = "#d45b19";
            }
            else if (feature[i].properties.mag > 8) {
                color = "#e31919";
            }
        
            // Add circles to map
            // magMarkers.push(
            layer.circle(feature[i].properties.place, {
                fillOpacity: 0.5,
                color: "white",
                fillColor: color,
                // Adjust radius
                radius: feature[i].properties.mag * 1000})
            
        };
            // popup
        layer.bindPopup("<h3>" + feature.properties.place + "</h3>" +   "<h3>Magnitude: " + feature.properties.mag + "<hr><p>" + new Date(feature.properties.time) + "</p>")      
        }

        var earthquakes = L.geoJSON(earthquakeData, {
            onEachFeature: onEachFeature
        });
        
    createMap(earthquakes);
}

function createMap(earthquakes) {
  // Adding outdoor and satelite layer
  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: "pk.eyJ1IjoiY2hhbWItZmVybHkiLCJhIjoiY2s4Z2xnbmc1MDJ2YjNlcnVncWg4bWM4eiJ9.oRkZ3-0VtnzAvvgo2flEcQ"
  });

  var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken:"pk.eyJ1IjoiY2hhbWItZmVybHkiLCJhIjoiY2s4Z2xnbmc1MDJ2YjNlcnVncWg4bWM4eiJ9.oRkZ3-0VtnzAvvgo2flEcQ"
  });


// create magnitude marker layer
// var magMark = L.layerGroup(magMarkers)

//   baseMaps object to hold our base layers
  var baseMaps  = {
      "Outdoors Map": outdoors,
      "Satellite Map": satellite
  };
  // overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    // "Magnitude by Location": magMark
  };

// Creating map object
var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [satellite, earthquakes]
    });
    // Layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    };  

// Legend
// var legend = L.control({position: 'bottomleft'});
// legend.onAdd = function(map) {
// }

// Heatmap
// var heatmap = new HeatCanvas("canvasId");
// heatmap.push(x, y, value);
// heatmap.render();
// v = f(d)
// var colorscheme = function(value){
//     return [0.3, 0.75, value, 1];
// }
// heatmap.render(null, null, colorscheme);
// heatmap.clear();