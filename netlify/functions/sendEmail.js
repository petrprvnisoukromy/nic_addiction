const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        console.log('Received event:', event.body);  // Log the incoming data

        const EMAILJS_USER_ID = process.env.WeTdS5lsV21zN9PSO || 'default_user_id';  // Add fallback for testing
        const EMAILJS_SERVICE_ID = process.env.service_67czw3m || 'default_service_id';
        const EMAILJS_TEMPLATE_ID = process.env.template_o51od7c || 'default_template_id';

        console.log('Using EmailJS config:', EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID);

        const data = JSON.parse(event.body);

        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_name: data.name,
            from_name: "Haze Haven",
            to_email: data.email,
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
        };
    }
};
