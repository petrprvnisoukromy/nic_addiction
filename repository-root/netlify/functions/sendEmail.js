document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Gather form data
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        message: document.querySelector('textarea[name="message"]').value,
    };

    // Call the serverless function
    fetch('/.netlify/functions/sendEmail', {
        method: 'POST', // We're sending data, so we use POST
        headers: {
            'Content-Type': 'application/json', // We're sending JSON data
        },
        body: JSON.stringify(formData) // Convert the form data to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.message === 'Email sent successfully') {
            alert('Děkujeme! Váš e-mail byl odeslán.');
        } else {
            alert('Odeslání e-mailu se nezdařilo. Zkuste to prosím znovu.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Došlo k chybě při odesílání e-mailu. Zkuste to prosím znovu.');
    });
});
