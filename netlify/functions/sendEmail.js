const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        const data = JSON.parse(event.body);

        const response = await emailjs.send("service_67czw3m", "template_o51od7c", {
            to_name: data.name || 'Unknown',
            from_name: "Haze Haven",
            to_email: data.email || 'No email provided',
        });

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
