const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../dist");

// Function to remove <script locals></script> block
function removeLocalsScriptBlock(content) {
  return content.replace(/<script[^>]*locals[^>]*>[\s\S]*?<\/script>/gi, "");
}

// Function to process HTML files
function processHtmlFiles() {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error(`Unable to scan directory: ${err}`);
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const fileExt = path.extname(file);

      if (fileExt === ".html") {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            return console.error(`Unable to read file: ${err}`);
          }

          const updatedContent = removeLocalsScriptBlock(data);

          fs.writeFile(filePath, updatedContent, "utf8", (err) => {
            if (err) {
              return console.error(`Unable to write file: ${err}`);
            }

            console.log(`Processed: ${file}`);
          });
        });
      }
    });
  });
}

// Execute the function
processHtmlFiles();
