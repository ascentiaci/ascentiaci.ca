const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../dist");

// Function to remove <script locals></script> block
/**
 * @description Removes script blocks containing "locals" from a given content string,
 * using a regular expression to match and replace occurrences of such blocks.
 * 
 * @param {string} content - HTML content to be processed.
 * 
 * @returns {string} Content with all script blocks that contain "locals" removed.
 */
function removeLocalsScriptBlock(content) {
  return content.replace(/<script[^>]*locals[^>]*>[\s\S]*?<\/script>/gi, "");
}

// Function to process HTML files
/**
 * @description Scans a directory for HTML files, reads each file, removes any local
 * script blocks, and writes the updated content back to the original file. It logs
 * a success message for each processed file.
 * 
 * @returns {any} Console logs and errors during file processing.
 */
function processHtmlFiles() {
  fs.readdir(directoryPath, (err, files) => {
    // Scans a directory, reads and processes HTML files, then writes back updated content.

    if (err) {
      return console.error(`Unable to scan directory: ${err}`);
    }

    files.forEach((file) => {
      // Processes HTML files by reading, updating and writing them.

      const filePath = path.join(directoryPath, file);
      const fileExt = path.extname(file);

      if (fileExt === ".html") {
        fs.readFile(filePath, "utf8", (err, data) => {
          // Reads, processes, and writes a file.

          if (err) {
            return console.error(`Unable to read file: ${err}`);
          }

          const updatedContent = removeLocalsScriptBlock(data);

          fs.writeFile(filePath, updatedContent, "utf8", (err) => {
            // Writes a file and logs its status.

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
