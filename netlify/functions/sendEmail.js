const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { name, email } = JSON.parse(event.body);

    // Create a transporter object using SMTP or any other transport method
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use other services like SendGrid, Mailgun, etc.
        auth: {
            user: process.env.GMAIL_USER, // Use your environment variables
            pass: process.env.GMAIL_PASS
        }
    });

    // Email options
    let mailOptions = {
        from: 'your-email@gmail.com', // Replace with your email address
        to: email, // This is where the form email will go
        subject: 'Thank you for reaching out!',
        text: `Hello ${name},\n\nThank you for your interest! We will get back to you soon.\n\nBest regards,\nHaze Haven Team`
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error })
        };
    }
};
