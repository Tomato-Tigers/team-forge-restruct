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
            email: email,
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

async function getEntryByID(id) {
    const data = await prisma.entry.findFirst({
        where: {
            id: id,
        }
    });
    return data;
}

async function getRelationByID(email) {
    const relation = await prisma.entry.findUnique({
        where: {
            email: email,
        },
        select: {
            relation: true
        }
    });
    return relation;
}

async function updateRelationByID(email, relation) {
    const res = await prisma.entry.update({
        where: {
            email: email,
        },
        data: {
            relation: relation,
        },
    });
    return res;
}

// async function modifyEntryByID(prisma, id, data) {
//     const updatedEntry = await prisma.entry.update({
//         where: {
//             title: username,
//         },
//         data: data
//     });
//     return updatedEntry;
// }

async function deleteEntryByID(prisma, id) {
    await prisma.entry.delete({
        where: {
            id: id,
        }
    });
}

// async function getTableIdByID(prisma, id) {
//     const entry = await prisma.entry.findFirst({
//         where: {
//             title: username,
//         },
//         select: {
//             id: true
//         }
//     });
//     return entry?.id;
// }

async function getStudentsByClassID(prisma, classID) {
    return await prisma.Class.findUnique({
        where: {
            classID: classID
        },
        select: {
            members: true // Retrieves all Entry (student) records associated with the class
        }
    });
}

async function getClassPreference(id) {
    return await prisma.classPreferences.findUnique({
        where: {
            userID_classID: id
        }
    })
}

async function upsertUserStaticPreferences(data) {
    console.log('Upserting Data:', data);
    try {
        return await prisma.staticPreferences.upsert({
            where: {
                userId: data.userId,
            },
            update: {
                selectedSkills: data.selectedSkills,
                availability: data.availability,
            },
            create: {
                userId: data.userId,
                selectedSkills: data.selectedSkills,
                availability: data.availability,
            },
        });
    } catch (error) {
        console.error('Error in upsertUserStaticPreferences:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

async function createMessage(senderId, recipientId, content) {
    return await prisma.message.create({
        data: {
            senderId,
            recipientId,
            content
        }
    });
}

async function getUserIdByEmail(email) {
    const user = await prisma.entry.findUnique({
        where: { email }
    });
    return user?.id;
}

async function getInbox(userId) {
    if (userId === undefined) {
        throw new Error('User ID is undefined');
    }

    return await prisma.message.findMany({
        where: {
            recipientId: userId, // Corrected field name
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

async function getSentMessages(userId) {
    if (userId === undefined) {
        throw new Error('User ID is undefined');
    }

    return await prisma.message.findMany({
        where: {
            senderId: userId, // Corrected field name
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

async function getStablePreferencesByUserID(userID) {
    return await prisma.stablePreferences.findUnique({
        where: { userID: userID }
    });
}

async function upsertStablePreferences(data) {
    return await prisma.stablePreferences.upsert({
        where: { userID: data.userID },
        update: data,
        create: data,
    });
}

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
    getEntryByID,
    getRelationByID,
    updateRelationByID,
    // modifyEntryByID,
    deleteEntryByID,
    // getTableIdByID,
    getStudentsByClassID,
    getClassPreference,
    upsertUserStaticPreferences,
    createMessage,
    getUserIdByEmail,
    getInbox,
    getSentMessages,
    getStablePreferencesByUserID,
    upsertStablePreferences,
    createClassPreferences

};