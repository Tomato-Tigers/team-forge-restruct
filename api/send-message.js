// This API endpoint allows sending a new message
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { senderEmail, recipientEmail, messageContent } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        senderEmail,
        recipientEmail,
        content: messageContent,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ message: 'Error sending message', error });
  } finally {
    await prisma.$disconnect();
  }
};
