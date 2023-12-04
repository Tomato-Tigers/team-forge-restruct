const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { email, stableSkills, stableInterests, availability } = req.body;

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

    const stablePreferences = await prisma.stablePreferences.upsert({
      where: { userID: user.id },
      update: { stableSkills, stableInterests, availability },
      create: {
        userID: user.id, 
        stableSkills, 
        stableInterests, 
        availability: availability || {} },
      
    });

    res.status(200).json(stablePreferences);
  } catch (error) {
    console.error('Error setting stable preferences:', error);
    res.status(500).send('Internal server error');
  } finally {
    await prisma.$disconnect();
  }
};
