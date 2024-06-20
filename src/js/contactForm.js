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
    window.cfTurnstile.render(turnstileContainer);
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
    var responseField = document.getElementById("cf-turnstile-response");
    if (responseField) {
      responseField.value = ""; // Clear previous response value
      // Validate Turnstile response
      window.cfTurnstile.onSubmit(event, function (token) {
        if (token) {
          responseField.value = token; // Set the token in the hidden field
          document.getElementById("leadForm").submit(); // Submit the form
        } else {
          // Provide feedback to the user
          document.getElementById("feedbackMessage").style.display = "block";
          event.preventDefault(); // Prevent form submission
        }
      });
    } else {
      event.preventDefault(); // Prevent form submission if Turnstile script is not loaded
      document.getElementById("feedbackMessage").style.display = "block";
    }
  });

function validateForm() {
  var tokenValue = document.getElementById("cf-turnstile-response")
    ? document.getElementById("cf-turnstile-response").value
    : "";
  // var consentChecked = document.getElementById('consent').checked;

  if (!tokenValue) {
    document.getElementById("feedbackMessage").style.display = "block";
    return false; // Prevent form submission if the token is empty
  }

  if (!consentChecked) {
    alert(
      "You must agree to the terms and conditions before submitting the form.",
    );
    return false; // Prevent form submission if the consent is not checked
  }

  return true;
}
