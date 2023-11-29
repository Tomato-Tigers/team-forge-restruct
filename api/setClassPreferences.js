const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }
  
    const {
        email,
        classID,
        preferredSkills,
        preferredSkillsWeight,
        interests,
        interestsWeight} = req.body;
  
    try {
      const classPreferences = await prisma.classPreferences.upsert({
        where: {
          userID_classID: {
            userID: req.body.email,
            classID: req.body.classID
          }
        },
        update: {
          preferredSkills: preferredSkills,
          preferredSkillsWeight: preferredSkillsWeight,
          interests: interests,
          interestsWeight: interestsWeight
        },
        create: {
            userID: email,
            classID: classID,
            preferredSkills: preferredSkills,
            preferredSkillsWeight: preferredSkillsWeight,
            interests: interests,
            interestsWeight: interestsWeight
          },
      });
  
      res.json(classPreferences);
    } catch (error) {
      console.error("Error setting class preferences:", error);
      return res.status(500).send('Internal server error');
    } finally {
      await prisma.$disconnect();
    }
  };