// Import the getUserIdByEmail function from prismaAPI.js
const { getUserIdByEmail } = require('../src/prismaAPI');

module.exports = async (req, res) => {
  try {
    // Extract email from the request query or body
    const email = req.query.email || req.body.email;

    // Use the function to get the user ID
    const userId = await getUserIdByEmail(email);

    // Send the user ID in the response
    res.status(200).json({ userId });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
