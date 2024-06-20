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
  }),
  document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var token = document.getElementById("cf-turnstile-response").value;
    if (token === "") {
      document.getElementById("feedbackMessage").classList.remove("d-none");
    } else {
      document.getElementById("feedbackMessage").classList.add("d-none");
      // Submit the form using AJAX to prevent redirect
      var formData = new FormData(document.getElementById("leadForm"));
      fetch(document.getElementById("leadForm").action, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("leadForm").innerHTML =
            "<h2>Thanks for your submission!</h2>";
        })
        .catch((error) => {
          document.getElementById("leadForm").innerHTML =
            "<h2>There was an error with your submission. Please try again.</h2>";
        });
    }
  });
