const emailjs = require('emailjs-com'); // Ensure emailjs-com is imported correctly
const fetch = require('node-fetch'); // For any fetch requests you need to make

exports.handler = async function (event, context) {
    try {
        const { name, email } = JSON.parse(event.body);

        const response = await emailjs.send(
            process.env.SERVICE_ID,
            process.env.TEMPLATE_ID,
            {
                to_name: name,
                to_email: email,
            },
            process.env.USER_ID
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email' }),
        };
    }
};
