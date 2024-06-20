document
  .getElementById("leadForm1")
  .addEventListener("shown.bs.modal", function () {
    if (!document.querySelector(".cf-turnstile")) {
      var e;
      ((e = document.createElement("script")).src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js"),
        (e.async = !0),
        (e.onload = function () {
          var e = document.getElementById("turnstileContainer");
          e.classList.remove("d-none"),
            e.classList.add("cf-turnstile"),
            e.setAttribute("data-sitekey", "0x4AAAAAAAYDjhZNjYSI8Zc8"),
            window.cfTurnstile.render(e, {
              callback: function (e) {
                document.getElementById("cf-turnstile-response").value = e;
              },
            });
        }),
        document.head.appendChild(e);
    }
  });

document.getElementById("leadForm").addEventListener("submit", function (e) {
  var token = document.getElementById("cf-turnstile-response").value;
  if (token === "") {
    e.preventDefault(); // Prevent form submission if Turnstile token is missing
    document.getElementById("feedbackMessage").classList.remove("d-none");
  } else {
    document.getElementById("feedbackMessage").classList.add("d-none");
    // The form will now submit as usual
  }
});
