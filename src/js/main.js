// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

function alertBar(startDate, endDate, content, school) {
  if (!document.getElementsByTagName("title")[0].innerText.includes(school)) {
    return;
  }
  let now = new Date();

  if (startDate > now) {
    return;
  }
  if (endDate < now) {
    return;
  }
  console.log(content);
  document.getElementById("alertarea").innerHTML = content;
}

let alertStartDate = new Date("2024-10-8");
let alertEndDate = new Date("2024-10-19");
let content = `
<div style="background-color: #0033cc; color: #fff; padding: 15px; text-align: center; position: relative; z-index: 1000;">
  <strong>OPEN HOUSE: Tour, Meet & Win!</strong> 
  <a href="https://www.facebook.com/share/GxT2SMBWXGgoRYt2/" id="openHouseLink" style="color: #ffcc00; text-decoration: underline;">Click here for more details!</a>
</div>

`;
let school = "Elevare";

alertBar(alertStartDate, alertEndDate, content, school);
