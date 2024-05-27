// scripts/injectBrand.js
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const brand = process.env.BRAND;
const brandSC = process.env.BRAND_SC;

const scssContent =
  `$brand: '${brand}';\n` +
  fs.readFileSync(path.join(__dirname, "../src/scss/styles.scss"), "utf8");

fs.writeFileSync(
  path.join(__dirname, "../src/scss/_generated.scss"),
  scssContent,
);


const baseContent = fs.readFileSync(path.join(__dirname, "../src/parts/baseSrc.htm" ))

const brandLocals = `
<script locals>
  module.exports = {
    bRaNd: '${brand}',
    bRaNdSC: '${brandSC}'
  }
</script>
`
const newBaseContent = brandLocals + baseContent

fs.writeFileSync(
  path.join(__dirname, "../src/parts/base.htm"),
  newBaseContent,
)

console.log("Brand injected successfully");
