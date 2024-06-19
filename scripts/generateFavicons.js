const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs/promises");

// Load environment variables from .env file
dotenv.config();

const buildBrand = process.env.BUILD_BRAND;
if (!buildBrand) {
  console.error("BUILD_BRAND environment variable is not set");
  process.exit(1);
}

const faviconPath = path.join(
  __dirname,
  `../src/images/${buildBrand}_favicon.ico`,
);
const faviconDestPath = path.join(__dirname, `../dist/favicon.ico`);

fs.copyFile(faviconPath, faviconDestPath)
  .then(() => {
    console.log(
      `Favicon for brand '${buildBrand}' copied successfully to ${faviconDestPath}`,
    );
  })
  .catch((error) => {
    console.error("Error copying favicon:", error);
  });
