// Function to load the Turnstile script
function loadTurnstile() {
  var script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.onload = function () {
    // Initialize Turnstile widget
    var turnstileContainer = document.getElementById("turnstileContainer");
    turnstileContainer.classList.remove("d-none");
    turnstileContainer.classList.add("cf-turnstile");
    turnstileContainer.setAttribute("data-sitekey", "0x4AAAAAAAYDjhZNjYSI8Zc8");
    window.cfTurnstile.render(turnstileContainer, {
      callback: function (token) {
        document.getElementById("cf-turnstile-response").value = token;
      },
    });
  };
  document.head.appendChild(script);
}

// Load Turnstile widget when modal is shown
var leadFormModal = document.getElementById("leadForm1");
leadFormModal.addEventListener("shown.bs.modal", function () {
  if (!document.querySelector(".cf-turnstile")) {
    loadTurnstile();
  }
});

document
  .getElementById("leadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    var responseField = document.getElementById("cf-turnstile-response");
    if (responseField.value === "") {
      document.getElementById("feedbackMessage").classList.remove("d-none");
    } else {
      document.getElementById("feedbackMessage").classList.add("d-none");
      // Simulate successful form submission with a thank you message
      document.getElementById("leadForm").innerHTML =
        "<h2>Thanks for your submission!</h2>";
    }
  });
