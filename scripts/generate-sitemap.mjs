import fs from "fs";
import SitemapGenerator from "sitemap-generator";
import Server from "sp-wt/modules/server.js";
import StaticRouter from "sp-wt/modules/staticRouter.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = new Server();

app.use("/", new StaticRouter(__dirname + "/dist/"));

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

// Create generator
const generator = SitemapGenerator("http://localhost:8080", {
  stripQuerystring: false,
  maxDepth: 5, // Adjust this to set the maximum crawl depth
  maxEntriesPerFile: 50000, // Number of entries per sitemap file
  stripWWW: false, // Don't strip www
  lastMod: true, // Enable last modified date
});

// Store URLs
const urls = [];

// Register event listeners
generator.on("add", (url) => {
  urls.push(url);
});

generator.on("done", () => {
  fs.writeFileSync("../urls.json", JSON.stringify(urls, null, 2));
  process.exit();
});

// Error handling
generator.on("error", (error) => {
  console.error("Error during sitemap generation:", error);
});

// Start the crawler
generator.start();
