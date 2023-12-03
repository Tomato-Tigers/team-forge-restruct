// This API endpoint retrieves inbox messages for a user
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { recipientEmail } = req.query;
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const messages = await prisma.message.findMany({
      where: {
        recipientEmail,
      },
      skip: page * limit,
      take: limit,

      include: {
        sender: true, // Include sender information
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving inbox messages:', error);
    res.status(500).send({ message: 'Error retrieving inbox messages', error });
  } finally {
    await prisma.$disconnect();
  }
};
