const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        // Ensure the environment variables are correctly set
        const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
        const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

        if (!EMAILJS_USER_ID || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'EmailJS environment variables are not set correctly.' }),
            };
        }

        const data = JSON.parse(event.body);

        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_name: data.name || 'Unknown',
            from_name: "Haze Haven",
            to_email: data.email || 'No email provided',
        }, EMAILJS_USER_ID);

        console.log('EmailJS response:', response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };aá
    }
};
