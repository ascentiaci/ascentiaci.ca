const dotenv = require("dotenv");
const fs = require("fs");
const { join } = require("path");

dotenv.config();

const brand = process.env.brand;

const brandPrefixContent = `<!-- START LOCALS-->
<script locals>
module.exports = {
    bRaNd: '${brand}'
}
</script>
`;

const indexContent = fs.readFileSync(join(__dirname, "../index.html"), "utf-8");

// find the string <!-- START LOCALS--> and <!-- END LOCALS--> and store the line numbers
const start = indexContent.indexOf("<!-- START LOCALS-->");
const end = indexContent.indexOf("<!-- END LOCALS-->");

// replace the content between the line numbers with the brandPrefixContent
const newContent =
  indexContent.slice(0, start) + brandPrefixContent + indexContent.slice(end);

// write the new content to the index.html file
fs.writeFileSync(join(__dirname, "../index.html"), newContent);
