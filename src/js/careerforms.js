document.querySelector('turnstile-widget').addEventListener('success', function (e) {
    document.getElementById('cfToken').value= e.detail.content
});

document.getElementById('jobListingForm').addEventListener('submit', function(event) {
    if (document.getElementById('cfToken').value === null) {
        alert('Please solve the Cloudflare Challenge')
        return;
    }
    event.preventDefault();
    
    if (!this.checkValidity()) {
      event.stopPropagation();
      this.classList.add('was-validated');
      return;
    }
  
    // Serialize form data into an object
    var formData = {
      companyName: document.getElementById('companyName').value,
      contactPerson: document.getElementById('contactPerson').value,
      emailAddress: document.getElementById('emailAddress').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      jobTitle: document.getElementById('jobTitle').value,
      jobLocation: document.getElementById('jobLocation').value,
      jobType: document.getElementById('jobType').value,
      numVacancies: document.getElementById('numVacancies').value,
      salaryRange: document.getElementById('salaryRange').value,
      jobDescription: document.getElementById('jobDescription').value,
      additionalInfo: document.getElementById('additionalInfo').value,
      turnstileToken: document.getElementById('cfToken').value  // Get Turnstile response token
    };
  
    // Example n8n Webhook URL
    var webhookUrl = 'https://marketing-n8n.hqt7vl.easypanel.host/webhook-test/1d8e41e9-0fbe-4a4a-9fc3-f6e5825bd352';
  
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Job listing submitted successfully!');
      // Reset the form or redirect the user
      document.getElementById('jobListingForm').reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while submitting the job listing.');
    });
  });
  