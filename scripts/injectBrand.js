// scripts/injectBrand.js
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const brand = process.env.BRAND;
const scssContent =
  `$brand: '${brand}';\n` +
  fs.readFileSync(path.join(__dirname, "../src/scss/styles.scss"), "utf8");

fs.writeFileSync(
  path.join(__dirname, "../src/scss/_generated.scss"),
  scssContent,
);
