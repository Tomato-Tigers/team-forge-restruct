const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }
  
    const { email, classID } = req.body;
  
    try {
      const classPreferences = await prisma.classPreferences.findUnique({
        where: {
          userId_classId: {
            userID: email,
            classID: classID
          }
        }
      });
  
      res.json(classPreferences);
    } catch (error) {
      console.error("Error getting class preferences:", error);
      return res.status(500).send('Internal server error');
    } finally {
      await prisma.$disconnect();
    }
  };