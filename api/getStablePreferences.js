const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const email = req.query.email;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    const user = await prisma.entry.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const stablePreferences = await prisma.stablePreferences.findUnique({
      where: { userID: user.id },
    });

    if (!stablePreferences) {
      return res.status(404).send('Preferences not found');
    }

    res.status(200).json(stablePreferences);
  } catch (error) {
    console.error('Error fetching stable preferences:', error);
    res.status(500).send('Internal server error');
  } finally {
    await prisma.$disconnect();
  }
};
