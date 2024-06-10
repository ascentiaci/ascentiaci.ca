const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const brand = process.env.BUILD_BRAND;

// Function to create a locals object from environment variables starting with "BUILD_"
function createLocalsObject() {
  const envVariables = process.env;
  const locals = {};

  for (const [key, value] of Object.entries(envVariables)) {
    if (key.startsWith("BUILD_")) {
      locals[key] = value;
    }
  }

  return locals;
}

// Generate the locals object
const locals = createLocalsObject();

// Function to update the .posthtmlrc file with new locals
function updatePosthtmlrc(filePath, newLocals) {
  const fileLocation = path.join(__dirname, filePath);

  try {
    // Read the content of the .posthtmlrc file
    const fileContent = fs.readFileSync(fileLocation, "utf8");
    const config = JSON.parse(fileContent);

    // Update the locals in the posthtml-expressions plugin
    if (config.plugins["posthtml-expressions"]) {
      config.plugins["posthtml-expressions"].locals = newLocals;
    } else {
      // If posthtml-expressions is not found, add it to the plugins
      config.plugins["posthtml-expressions"] = { locals: newLocals };
    }

    // Write the modified content back to the .posthtmlrc file
    // fs.writeFileSync(fileLocation, JSON.stringify(config, null, 2), "utf8");
    console.log(`✅ ${filePath} updated successfully with new locals.\n`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
}

// Call the function to update the .posthtmlrc file with the generated locals
updatePosthtmlrc("../.posthtmlrc", locals);

try {
  const scssContent =
    `$brand: '${brand}';\n` +
    fs.readFileSync(path.join(__dirname, "../src/scss/styles.scss"), "utf8");

  fs.writeFileSync(
    path.join(__dirname, "../src/scss/_generated.scss"),
    scssContent,
  );

  console.log(`✅ styles.scss updated successfully with ${brand} brand.\n`);
} catch (error) {
  console.error(`❌ Error updating styles.scss:`, error);
}
