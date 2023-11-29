const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNewUser(data) {
    return await prisma.entry.create({
        data: {
            email: data.email,
            password: data.password,
            name: data.name,
            //title: data.title,
            //skills: data.skills || [],
           // title: data.title || "Default Title"  
             // Assuming content field is used to store email
            // Include other default or required fields as necessary
        }
    });
}

async function getPasswordByEmail(prisma, email) {
    
    const entry = await prisma.entry.findUnique({
        where: {
            email:email,
        },
        select: {
            password: true
        }
    });

    if (entry && entry.password) {
        console.log(`Password for email ${email}: ${entry.password}`);  // Logging password
    } else {
        console.log(`No password found for email: ${email}`);
    }
    
    return entry?.password;
}



async function getSkillsByID(prisma, id) {
    const entry = await prisma.entry.findFirst({
        where: {
            id: id,
        },
        select: {
            skills: true
        }
    });
    return entry?.skills;
}

async function deleteEntryByID(prisma, id) {
    await prisma.entry.delete({
        where: {
            id: id,
        }
    });
}

async function modifyEntryByID(prisma, id, data) {
    const updatedEntry = await prisma.entry.update({
        where: {
            title: username,
        },
        data: data
    });
    return updatedEntry;
}

async function getTableIdByID(prisma, id) {
    const entry = await prisma.entry.findFirst({
        where: {
            title: username,
        },
        select: {
            id: true
        }
    });
    return entry?.id;
}

async function getClassPreferences(email, classID) {
    const classPreferences = await prisma.classPreferences.findUnique({
      where: {
        userId_classId: {
          userID: email,
          classID: classID
        }
      }
    })
    return classPreferences
  }

async function setClassPreferences(email, classID, preferredSkills, preferredSkillsWeight, interests, interestsWeight) {
const classPreferences = await prisma.classPreferences.upsert({
    where: {
    userID_classID: {
        userID: email,
        classID: classID
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
    }
})
return classPreferences
}

module.exports = {
    prisma,
    createNewUser,
    getPasswordByEmail,
    getSkillsByID,
    deleteEntryByID,
    modifyEntryByID,
    getTableIdByID,
    getClassPreferences,
    setClassPreferences
};