// using fs module, delete the ./dist and ./.parcel-cache folders, if they exist

//import fs
const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "../dist");
const parcelCache = path.join(__dirname, "../.parcel-cache");

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true });
}

if (fs.existsSync(parcelCache)) {
  fs.rmSync(parcelCache, { recursive: true });
}
