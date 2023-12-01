const { prisma, createClassPreferences } = require('../src/prismaAPI.js');

module.exports = async (req, res) => {
  console.log (req.body);

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }

    const { email, classID } = req.body;

    console.log("email: ", email);

  const User = await prisma.entry.findFirst({
    where: {
            email: email,
        },
    });
  const user = User.id;

  console.log(user);
  console.log(classID);

    try {
      let classPreferences = await prisma.classPreferences.findUnique({
        where: {
          userID_classID: {
            userID: user,
            classID: classID
          }
        }
      });
      console.log(classPreferences);
      if (classPreferences === null) {
        classPreferences = await createClassPreferences(user, classID);
        res.status(201).json({ message: "Preferences set to default values", classPreferences });
      } else {
        res.status(200).json({ message: "Class preferences fetched", classPreferences });
      }
    } catch (error) {
      console.error("Error getting class preferences:", error);
      res.status(500).send('Internal server error');
    }
  };
