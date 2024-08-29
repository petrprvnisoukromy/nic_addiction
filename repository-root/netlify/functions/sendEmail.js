const emailjs = require('emailjs'); // Assuming you're using emailjs in the serverless function

exports.handler = async function(event, context) {
    const { name, email, message } = JSON.parse(event.body);

    const emailParams = {
        to_name: name,
        to_email: email, // This will send the email to the user's email address
        message: message,
    };

    try {
        // Sending email using EmailJS
        await emailjs.send('service_67czw3m', 'template_o51od7c', emailParams, 'WeTdS5lsV21zN9PSO');
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email' }),
        };
    }
};
