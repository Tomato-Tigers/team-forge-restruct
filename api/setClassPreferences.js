const { PrismaClient } = require('@prisma/client');
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
        interestsWeight
    } = req.body;
  
    // Find the user based on email
    const User = await prisma.entry.findFirst({
        where: { email: email },
    });

    // Check if user exists
    if (!User) {
        return res.status(404).json({ error: 'User not found' });
    }

    const userID = User.id;

    console.log(userID);
    console.log(classID);

    try {
        // Check if ClassPreferences record exists
        const existingRecord = await prisma.classPreferences.findFirst({
            where: {
                userID: userID,
                classID: classID
            }
        });

        let classPreferences;

        // If record doesn't exist, create it
        if (!existingRecord) {
            classPreferences = await prisma.classPreferences.create({
                data: {
                    userID: userID,
                    classID: classID,
                    preferredSkills: preferredSkills,
                    preferredSkillsWeight: preferredSkillsWeight,
                    interests: interests,
                    interestsWeight: interestsWeight
                }
            });
        } else {
            // Update existing record
            classPreferences = await prisma.classPreferences.update({
                where: {
                    userID_classID: {
                        userID: userID,
                        classID: classID
                    }
                },
                data: {
                    preferredSkills: preferredSkills,
                    preferredSkillsWeight: preferredSkillsWeight,
                    interests: interests,
                    interestsWeight: interestsWeight
                }
            });
        }

        res.json(classPreferences);
    } catch (error) {
        console.error("Error setting class preferences:", error);
        return res.status(500).send('Internal server error');
    } finally {
        await prisma.$disconnect();
    }
};
