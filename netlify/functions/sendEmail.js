document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.getElementById('button');
    btn.textContent = 'Sending...';

    const formData = {
        name: document.querySelector('input[name="to_name"]').value,
        email: document.querySelector('input[name="to_email"]').value,
    };

    fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Email sent successfully') {
            btn.textContent = 'Odeslat';
            alert('Děkujeme! Váš e-mail byl odeslán.');
        } else {
            btn.textContent = 'Odeslat';
            alert('Odeslání e-mailu se nezdařilo. Zkuste to prosím znovu.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        btn.textContent = 'Odeslat';
        alert('Došlo k chybě při odesílání e-mailu. Zkuste to prosím znovu.');
    });
});
