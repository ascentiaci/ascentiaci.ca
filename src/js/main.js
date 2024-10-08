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
  <h1 style="color: #fff;"><strong>OPEN HOUSE: <br>Tour, Meet & Win!</strong> <br>
  <strong>Win a FULL Scholarship worth up to $16,300*</strong><br></h1>
  Join us for light refreshments.<br>
  *Eligibility based on admissions requirements. Ballot entry must be completed in person.<br>
  <a href="https://www.facebook.com/share/GxT2SMBWXGgoRYt2/" id="openHouseLink" style="color: #ffcc00; text-decoration: underline;">Click here for more details!</a>
</div>


`;
let school = "Elevare";

alertBar(alertStartDate, alertEndDate, content, school);
