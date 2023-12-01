const { getMessagesForUser, createMessageForUser } = require('../src/prismaAPI');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { email } = req.query;
    try {
      const messages = await getMessagesForUser(email);
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).send('Error fetching messages');
    }
  } else if (req.method === 'POST') {
    const { senderEmail, recipientEmail, messageContent } = req.body;
    try {
      const message = await createMessageForUser({ senderEmail, recipientEmail, messageContent });
      res.status(201).json(message);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
