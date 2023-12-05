const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  // Ensure that the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  // Extracting data from the request body
  const { email, stableSkills, stableInterests, availability } = req.body;

  // Validate the email
  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    // Find the user by email
    const user = await prisma.entry.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update the user's skills, interests, and availability
    const updatedUser = await prisma.entry.update({
      where: { email },
      data: { 
        skills: stableSkills, 
        interests: stableInterests, 
        availability: availability 
      },
    });

    // Send the updated user data as a response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error setting stable preferences:', error);
    res.status(500).send('Internal server error');
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
};
