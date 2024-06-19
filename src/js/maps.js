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
import { BUILD_BRAND } from "./vars";
// import { configDotenv } from "dotenv";

// configDotenv();

const lat = BUILD_BRAND === "ascentia" ? "-119.49742" : "-119.49680";
const long = BUILD_BRAND === "ascentia" ? "49.88389" : "49.88395";

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
    zoom: 19,
  }),
});

// Create a feature with a point geometry
const pinFeature = new Feature({
  geometry: new Point(fromLonLat([lat, long])),
});

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
