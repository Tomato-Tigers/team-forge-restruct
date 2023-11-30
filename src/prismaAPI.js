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





module.exports = {
    prisma,
    createNewUser,
    getPasswordByEmail,
    getSkillsByID,
    deleteEntryByID,
    modifyEntryByID,
    getTableIdByID,
    getStudentsByClassID,
    upsertUserStaticPreferences,
    createMessage,
    getUserIdByEmail,
    getInbox,
    getSentMessages

};