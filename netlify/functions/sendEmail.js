const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
        const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

        const data = JSON.parse(event.body);

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

        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Email sent successfully' }),
            };
        } else {
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
