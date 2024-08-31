// login.js in functions folder

exports.handler = async function(event, context) {
    const { username, password } = JSON.parse(event.body);

    // Access environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
        // Generate a simple token (you can enhance this with JWTs or similar)
        const token = Buffer.from(`${username}:${password}`).toString('base64');

        return {
            statusCode: 200,
            body: JSON.stringify({ token })
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "Invalid credentials" })
        };
    }
};
