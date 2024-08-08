import "../css/mapstyle.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import Overlay from "ol/Overlay";
import { BUILD_BRAND } from "./vars";
// import { configDotenv } from "dotenv";

// configDotenv();

const lat = BUILD_BRAND === "ascentia" ? "49.88389" : "49.88395";
const long = BUILD_BRAND === "ascentia" ? "-119.49742" : "-119.49680";
const iconFilename = BUILD_BRAND === "ascentia" ? "favicon.ico" : "favicon.ico";

// Create the map
const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([-119.49721, 49.88388]),
    zoom: 17, // Adjusted zoom level to be more zoomed out
  }),
});

// Create a feature with a point geometry
const pinFeature = new Feature({
  geometry: new Point(fromLonLat([parseFloat(long), parseFloat(lat)])),
});

// Define a style with the favicon as the custom icon for the pin
const pinStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: iconFilename, // Dynamically set the icon based on BUILD_BRAND
    scale: 0.5, // Adjust scale as needed to make the pin more visible
  }),
});

// Apply the style to the feature
pinFeature.setStyle(pinStyle);

// Create a vector source and add the feature to it
const vectorSource = new VectorSource({
  features: [pinFeature],
});

// Create a vector layer with the vector source
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// Add the vector layer to the map
map.addLayer(vectorLayer);

// Create a pop-up element
const container = document.createElement("div");
container.className = "ol-popup";
const content = document.createElement("div");
container.appendChild(content);

// Create an overlay to anchor the pop-up to the map
const overlay = new Overlay({
  element: container,
  positioning: "bottom-center",
  stopEvent: false,
  offset: [0, -30], // Adjusted offset to position the pop-up closer to the pin
});

// Add the overlay to the map
map.addOverlay(overlay);

// Function to show the pop-up
function showPopup() {
  const coordinates = pinFeature.getGeometry().getCoordinates();
  const instituteName =
    BUILD_BRAND === "ascentia"
      ? "Ascentia Career Institute"
      : "Elevare Career Institute";
  content.innerHTML = `<p>${instituteName}</p>`;
  overlay.setPosition(coordinates);
}

// Show the pop-up on map load
map.once("postrender", function () {
  showPopup();
});
