const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const brand = process.env.BUILD_BRAND;

// Function to create a locals block from environment variables starting with "BUILD_"
function createLocalsBlock() {
  const envVariables = process.env;
  let localsContent = "module.exports = {\n";

  // Iterate over environment variables and filter those that start with "BUILD_"
  for (const [key, value] of Object.entries(envVariables)) {
    if (key.startsWith("BUILD_")) {
      localsContent += `  ${key}: '${value}',\n`;
    }
  }
  // Add a static entry to the locals
  // localsContent += "  funky: 'biscuits'\n";
  localsContent += "}";

  // Create the full locals block with start and end markers
  return `
<!-- START LOCALS -->
<script locals>
${localsContent}
</script>
<!-- END LOCALS -->`.trim();
}

// Generate the locals block
const brandLocals = createLocalsBlock();

// Function to replace or prepend the locals block in the specified file
function replaceOrPrependLocals(filePath, newLocals) {
  const fileLocation = path.join(__dirname, filePath);

  // Read the content of the file
  let fileContent = fs.readFileSync(fileLocation, "utf8");

  // Define the start and end markers for the locals block
  const startLocals = "<!-- START LOCALS -->";
  const endLocals = "<!-- END LOCALS -->";

  // Find the start and end indexes of the existing locals block
  const startIndex = fileContent.indexOf(startLocals);
  const endIndex = fileContent.indexOf(endLocals) + endLocals.length;

  if (startIndex === -1 || endIndex === -1) {
    // If the locals block is not found, prepend the new locals block to the file content
    fileContent = newLocals + "\n" + fileContent;
  } else {
    // If the locals block is found, replace the existing locals block with the new one
    fileContent =
      fileContent.slice(0, startIndex) +
      newLocals +
      fileContent.slice(endIndex);
  }

  // Write the modified content back to the file
  fs.writeFileSync(fileLocation, fileContent, "utf8");
  console.log(
    `✅ ${filePath} updated successfully with new Locals. ${brand} injected\n  `,
  );
}

// Call the function to replace or prepend the locals block in the specified file
replaceOrPrependLocals("../src/parts/base.htm", brandLocals);
replaceOrPrependLocals("../src/parts/healthcare.htm", brandLocals);
replaceOrPrependLocals("../src/parts/education.htm", brandLocals);
replaceOrPrependLocals(
  "../src/parts/computer-systems-and-technology.htm",
  brandLocals,
);
replaceOrPrependLocals("../src/programs.html", brandLocals);
replaceOrPrependLocals("../src/index.html", brandLocals);

const scssContent =
  `$brand: '${brand}';\n` +
  fs.readFileSync(path.join(__dirname, "../src/scss/styles.scss"), "utf8");

fs.writeFileSync(
  path.join(__dirname, "../src/scss/_generated.scss"),
  scssContent,
);

console.log(`✅ styles.scss updated successfully with ${brand} brand.\n`);