const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    console.log("Function triggered");
    try {
        if (event.httpMethod !== 'POST') {
            console.log("Invalid HTTP method:", event.httpMethod);
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        console.log('Event body:', event.body);

        const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
        const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

        const data = JSON.parse(event.body);
        console.log('Parsed data:', data);

        const emailData = {
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_USER_ID,
            template_params: {
                to_name: data.name,
                to_email: data.email,
                from_name: "Haze Haven",
            }
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            console.log('Email sent successfully');
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Email sent successfully' }),
            };
        } else {
            console.log('Failed to send email');
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to send email' }),
            };
        }

    } catch (error) {
        console.error('Error sending email:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
};
