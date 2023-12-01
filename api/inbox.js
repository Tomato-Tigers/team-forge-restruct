const { getInbox } = require('../src/prismaAPI');

module.exports = async (req, res) => {
    console.log("Received userEmail in inbox.js:", req.query.userEmail); // Add this line
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { userEmail } = req.query;

  try {
    const messages = await getInbox(userEmail);
    res.status(200).send({ messages, message: 'Inbox fetched successfully' });
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).send({ message: 'Error fetching inbox', error: error });
  }
};
