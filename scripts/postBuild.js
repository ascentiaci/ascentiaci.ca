const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../dist");

// Function to remove <script locals></script> block
/**
 * @description Removes any HTML script blocks from a given content string that contain
 * the attribute `locals`. It uses a regular expression to match and replace such
 * script blocks with an empty string, effectively removing them.
 * 
 * @param {string} content - HTML content.
 * 
 * @returns {string} The original input content with all script blocks that contain
 * the keyword "locals" removed.
 */
function removeLocalsScriptBlock(content) {
  return content.replace(/<script[^>]*locals[^>]*>[\s\S]*?<\/script>/gi, "");
}

// Function to process HTML files
/**
 * @description Scans a directory, reads each HTML file, removes a specific script
 * block, and writes the updated content back to the original file. The process logs
 * success messages for processed files and error messages for any failures.
 * 
 * @returns {any} Primarily used to indicate success or failure of operations like
 * reading, writing and processing HTML files and their contents.
 */
function processHtmlFiles() {
  fs.readdir(directoryPath, (err, files) => {
    // Scans directory for HTML files, removes scripts, and writes updates.

    if (err) {
      return console.error(`Unable to scan directory: ${err}`);
    }

    files.forEach((file) => {
      // Processes HTML files.

      const filePath = path.join(directoryPath, file);
      const fileExt = path.extname(file);

      if (fileExt === ".html") {
        fs.readFile(filePath, "utf8", (err, data) => {
          // Reads, processes and writes a file.

          if (err) {
            return console.error(`Unable to read file: ${err}`);
          }

          const updatedContent = removeLocalsScriptBlock(data);

          fs.writeFile(filePath, updatedContent, "utf8", (err) => {
            // Writes and logs files.

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
