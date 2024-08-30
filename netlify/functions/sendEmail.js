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

        const EMAILJS_USER_ID = 'WeTdS5lsV21zN9PSO';  // Replace with your actual EmailJS user ID
        const EMAILJS_SERVICE_ID = 'service_67czw3m';  // Replace with your actual EmailJS service ID
        const EMAILJS_TEMPLATE_ID = 'template_o51od7c';  // Replace with your actual EmailJS template ID

        const data = JSON.parse(event.body);

        console.log('Sending email with:', EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID, data);

        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_name: 'Test User',
            from_name: "Haze Haven",
            to_email: 'test@example.com',
        }, EMAILJS_USER_ID);
        

        console.log('EmailJS response:', response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error sending email:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
};
