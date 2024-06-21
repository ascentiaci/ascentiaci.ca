document.getElementById("leadForm1").addEventListener("shown.bs.modal", function() {
  // No need to load Turnstile script
});

document.getElementById("leadForm").addEventListener("submit", function(e) {
  // No CAPTCHA validation, just submit the form
  document.getElementById("feedbackMessage").classList.add("d-none");
});
