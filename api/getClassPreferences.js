const { prisma, createClassPreferences} = require('../src/prismaAPI.js');

module.exports = async (req, res) => {
  console.log(req.body);
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
      if (!classPreferences) {
        classPreferences = await createClassPreferences(email, classID);
        res.status(201).json({ message: "Preferences set to default values", classPreferences });
      } else {
        res.status(200).json({ message: "Class preferences fetched", classPreferences });
      }
    } catch (error) {
      console.error("Error getting class preferences:", error);
      res.status(500).send('Internal server error');
    }
  };