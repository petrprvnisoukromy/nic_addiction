const emailjs = require('emailjs');

exports.handler = async function(event, context) {
    const { name, email} = JSON.parse(event.body);

    const emailParams = {
        to_name: name,
        to_email: email, // This will send the email to the user's email address
    };

    try {
        console.log('Sending email with params:', emailParams);
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams, 'YOUR_USER_ID');
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
};
