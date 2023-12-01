const { getSentMessages } = require('../src/prismaAPI');

module.exports = async (req, res) => {
    console.log("Received userEmail in sent.js:", req.query.userEmail); // Add this line
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { userEmail } = req.query;

  try {
    const messages = await getSentMessages(userEmail);
    res.status(200).send({ messages, message: 'Sent messages fetched successfully' });
  } catch (error) {
    console.error("Error fetching sent messages:", error);
    res.status(500).send({ message: 'Error fetching sent messages', error: error });
  }
};
