const emailjs = require('emailjs-com'); // Assuming this is installed via package.json or available globally

exports.handler = async function(event, context) {
    try {
        // Ensure the request method is POST
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        // Parse the request body
        const data = JSON.parse(event.body);

        // Log the received data for debugging purposes
        console.log('Received data:', data);

        // Use emailjs to send the email
        const response = await emailjs.send("service_67czw3m", "template_o51od7c", {
            to_name: data.name || 'Unknown',
            from_name: "Haze Haven",
            email: data.email || 'No email provided',
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
