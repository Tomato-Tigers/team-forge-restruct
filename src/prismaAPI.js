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

// Input: classID
// Output: Class
async function getClassByID(classID) {
    const classElement = await prisma.class.findUnique({
        where: {
            classID: classID,
        },
    });
    if (classElement !== null) {
        console.log(classElement.name); // prints the name of the user
      } else {
        console.log('No class found with this ID');
      }
    return classElement;
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

// Input: email, classID
// Output: initializes a row in ClassPreferences
async function createClassPreferences(user, classID) {;
    console.log("ccp %s %s", user, classID);
    return await prisma.classPreferences.create({
        data: {
            user: {
                connect: {
                    id: user
                }
            },
            class: {
                connect: {
                    classID: classID
                }
            },
            preferredSkills: [],
            preferredSkillsWeight: 0,
            interests: [],
            interestsWeight: 0,
        }
    });
}

module.exports = {
    prisma,
    createNewUser,
    getPasswordByEmail,
    getSkillsByID,
    deleteEntryByID,
    modifyEntryByID,
    getTableIdByID,
    createClassPreferences,
};