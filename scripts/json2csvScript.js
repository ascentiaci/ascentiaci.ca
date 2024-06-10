const fs = require("fs");
const { Parser } = require("json2csv");

// Function to read JSON file and convert to CSV
function jsonToCsv(inputFile, outputFile) {
  // Read the JSON file
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return;
    }

    try {
      // Parse JSON data
      const jsonData = JSON.parse(data);

      // Convert JSON to CSV
      const parser = new Parser();
      const csv = parser.parse(jsonData);

      // Write CSV to file
      fs.writeFile(outputFile, csv, (err) => {
        if (err) {
          console.error("Error writing the CSV file:", err);
          return;
        }
        console.log("CSV file has been created successfully.");
      });
    } catch (err) {
      console.error("Error parsing JSON data:", err);
    }
  });
}

// Replace 'input.json' with your input JSON file path
// Replace 'output.csv' with your desired output CSV file path
jsonToCsv("program-info.json", "pg-output.csv");
