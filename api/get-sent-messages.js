// This API endpoint retrieves sent messages for a user
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { senderEmail } = req.query;

  try {
    const messages = await prisma.message.findMany({
      where: {
        senderEmail,
      },
      include: {
        recipient: true, // Include the entire recipient object
      },
    
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving sent messages:', error);
    res.status(500).send({ message: 'Error retrieving sent messages', error });
  } finally {
    await prisma.$disconnect();
  }
};
